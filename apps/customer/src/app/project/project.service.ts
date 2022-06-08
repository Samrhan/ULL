import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Address as IAddress, JwtUser, MinimalFile, Project as IProject, ProjectState} from "@ull/api-interfaces";
import {CreateProjectDto} from "./dto/create-project.dto";
import {Project} from "./entity/project.entity";
import {Customer} from "../auth/entity/customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Address} from "./entity/address.entity";
import {StorageService} from "@ull/storage";
import {DEFAULT_PROJECT_PIC_CUSTOMER} from "@ull/global-constants";
import {EditProjectDto} from "./dto/edit-project.entity";
import {AmqpConnection, RabbitRPC} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class ProjectService {
  @Inject() storageService: StorageService
  @Inject() amqpConnection: AmqpConnection

  @InjectRepository(Customer) customerRepository: Repository<Customer>
  @InjectRepository(Project) projectRepository: Repository<Project>
  @InjectRepository(Address) addressRepository: Repository<Address>

  async createProject(body: CreateProjectDto, file: MinimalFile, user: JwtUser) {
    const project = new Project()
    project.name = body.project_name
    project.description = body.project_description
    project.amountOfPeople = Number(body.amount_of_people)
    project.projectDate = body.project_date
    project.projectState = ProjectState.draft
    if (file) {
      project.image = await this.storageService.upload(file, user)
    } else {
      project.image = DEFAULT_PROJECT_PIC_CUSTOMER
    }
    project.customer = await this.customerRepository.findOneOrFail({id: user.id})
    const address = new Address()
    address.number = body.address_number
    address.street = body.address_street
    address.city = body.address_city
    address.complement = body.address_complement
    address.postalCode = body.address_postal_code

    project.address = await this.addressRepository.save(address)

    await this.projectRepository.save(project)
  }

  async getProjectDetail(projectId: string): Promise<IProject> {
    const project = await this.projectRepository.findOne(projectId, {relations: ['customer', 'address']});
    if (!project) {
      throw new NotFoundException();
    }
    return <IProject>{
      project_id: projectId,
      name: project.name,
      customer_display_name: `${project.customer.firstname} ${project.customer.lastname.toUpperCase()}`,
      project_date: project.projectDate,
      description: project.description,
      image: project.image,
      amount_of_people: project.amountOfPeople,
      state: project.projectState,
      address: <IAddress>{
        number: project.address.number,
        street: project.address.street,
        postal_code: project.address.postalCode,
        city: project.address.city,
        complement: project.address.complement
      }
    }
  }

  async deleteProject(projectId: string, user: JwtUser) {
    const project = await this.projectRepository.findOne(projectId, {relations: ['customer']})
    if (!project) {
      throw new NotFoundException()
    }
    if (project.customer.id !== user.id) {
      throw new ForbiddenException()
    }
    if (project.image) {
      await this.storageService.delete(project.image, user)
    }
    await this.projectRepository.delete(project)

  }

  async editProject(body: EditProjectDto, file: MinimalFile, user: JwtUser) {
    const project = await this.projectRepository.findOne(body.project_id, {relations: ['customer', 'address']})
    if (!project) {
      throw new NotFoundException()
    }
    if (project.customer.id !== user.id) {
      throw new ForbiddenException()
    }
    project.name = body.project_name
    project.description = body.project_description
    project.amountOfPeople = Number(body.amount_of_people)

    if (new Date(project.projectDate).getTime() !== new Date(body.project_date).getTime()) {
      await this.amqpConnection.request({
        exchange: 'reservation',
        routingKey: 'update-project-date',
        payload: {project_id: project.idProject, new_date: body.project_date},
        timeout: 10000
      })
    }

    project.projectDate = body.project_date
    if (file) {
      await this.storageService.delete(project.image, user)
      project.image = await this.storageService.upload(file, user)
    }
    project.address.number = body.address_number
    project.address.street = body.address_street
    project.address.city = body.address_city
    project.address.complement = body.address_complement
    project.address.postalCode = body.address_postal_code

    project.address = await this.addressRepository.save(project.address)

    await this.projectRepository.save(project)
  }

  @RabbitRPC({
    exchange: 'reservation',
    routingKey: 'check-project',
    queue: 'customer-reservation'
  })
  async checkProject(message: { project_id: string, user_id: string }) {
    try {
      const project = await this.projectRepository.findOne(message.project_id, {relations: ['customer']})
      if (project.customer.id !== message.user_id) {
        return {state: 403}
      }
      return {
        state: 200,
        value: await this.getProjectDetail(message.project_id)
      }

    } catch {
      return {state: 404}
    }
  }
}
