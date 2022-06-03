import {Inject, Injectable} from '@nestjs/common';
import {JwtUser, MinimalFile, ProjectState} from "@ull/api-interfaces";
import {CreateProjectDto} from "./dto/create-project.dto";
import {Project} from "./entity/project.entity";
import {Customer} from "../auth/entity/customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Address} from "./entity/address.entity";
import {StorageService} from "@ull/storage";
import {DEFAULT_PROJECT_PIC_CUSTOMER} from "@ull/global-constants";

@Injectable()
export class ProjectService {
    @Inject() storageService: StorageService

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
        if(file) {
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
}
