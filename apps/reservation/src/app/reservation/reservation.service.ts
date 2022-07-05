import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {PostReservationDto} from "./dto/post-reservation.dto";
import {
    JwtUser,
    Performance,
    Project,
    Reservation as IReservation,
    ReservationState,
    UserType
} from "@ull/api-interfaces";
import {AmqpConnection, RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {Reservation} from "./entity/reservation.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {In, MoreThanOrEqual, Repository} from "typeorm";
import {AnswerReservationDto} from "./dto/answer-reservation.dto";

@Injectable()
export class ReservationService {

    @Inject() amqpConnection: AmqpConnection
    @InjectRepository(Reservation) reservationRepository: Repository<Reservation>

    async addReservation(body: PostReservationDto, user: JwtUser) {
        const project = await this.getProject(body.project_id, user.id)
        const performance = await this.getPerformance(body.performance_id)
        const reservation = new Reservation()
        reservation.idProject = body.project_id
        reservation.idPerformance = body.performance_id
        reservation.quantity = body.quantity
        reservation.addedDate = new Date().toISOString();
        reservation.state = ReservationState.ADDED
        reservation.projectDate = project.project_date
        reservation.providerId = performance.provider_id
        reservation.customerId = user.id
        await this.reservationRepository.save(reservation)
    }

    async getReservationDetail(idProject: string, idPerformance: string, user: JwtUser): Promise<IReservation> {
        const reservation = await this.reservationRepository.findOne({where: {idPerformance, idProject}})
        if (!reservation) {
            throw new NotFoundException()
        }
        if (user.userType === UserType.CUSTOMER && reservation.customerId !== user.id) {
            throw new ForbiddenException()
        }
        if (user.userType === UserType.PROVIDER && reservation.providerId !== user.id) {
            throw new ForbiddenException()
        }
        return <IReservation>{
            project: await this.getProject(idProject, user.id),
            performance: await this.getPerformance(idPerformance),
            quantity: reservation.quantity,
            state: reservation.state,
            replacement_performance_id: reservation.reservationReplace?.idPerformance,
        }
    }


    async deleteReservation(idProject: string, idPerformance: string, user: JwtUser) {
        const reservation = await this.reservationRepository.findOne({where: {idPerformance, idProject}})
        if (!reservation) {
            throw new NotFoundException()
        }
        if (reservation.customerId !== user.id) {
            throw new ForbiddenException()
        }
        await this.reservationRepository.delete({idProject, idPerformance})
    }

    async getProviderReservations(user: JwtUser) {
        return (await this.reservationRepository.find({
            where: {
                providerId: user.id,
                state: In([ReservationState.PAID, ReservationState.CUSTOMER_CANCELLED, ReservationState.PROVIDER_CANCELLED]),
                projectDate: MoreThanOrEqual(new Date().toISOString())
            }
        })).map((r) => ({
            performance_id: r.idPerformance,
            project_id: r.idProject
        }));
    }

    async getRequestProviderReservations(user: JwtUser) {
        return (await this.reservationRepository.find({
            where: {
                providerId: user.id,
                state: In([ReservationState.PENDING, ReservationState.ACCEPTED, ReservationState.REJECTED]),
                projectDate: MoreThanOrEqual(new Date().toISOString())
            }
        })).map((r) => ({
            performance_id: r.idPerformance,
            project_id: r.idProject
        }));
    }

    async getProject(projectId: string, userId: string): Promise<Project> {
        const response = await this.amqpConnection.request<{ state: number, value: Project }>({
            exchange: 'reservation',
            routingKey: 'check-project',
            payload: {project_id: projectId, user_id: userId},
            timeout: 10000
        });
        switch (response.state) {
            case 404:
                throw new NotFoundException('Project not found')
            case 200:
                return response.value
        }
    }

    async getPerformance(id: string): Promise<Performance> {
        const response = await this.amqpConnection.request<{ state: boolean, value: Performance }>({
            exchange: 'reservation',
            routingKey: 'check-reservation',
            payload: {id},
            timeout: 10000
        });
        if (!response.state) {
            throw new NotFoundException('Performance not found or archived')
        }
        return response.value
    }

    async getAllReservation(idProject: string, user: JwtUser): Promise<{ performance_id: string, project_id: string }[]> {
        await this.getProject(idProject, user.id)
        return (await this.reservationRepository.find({where: {idProject}})).map((r) => ({
            performance_id: r.idPerformance,
            project_id: r.idProject
        }));
    }

    @RabbitRPC({
        exchange: 'reservation',
        routingKey: 'update-project-date',
        queue: 'update-project'
    })
    async updateReservationDate(message: { project_id: string, new_date: string }) {
        await this.reservationRepository.update({idProject: message.project_id}, {projectDate: message.new_date})
    }

    @RabbitRPC({
        exchange: 'reservation',
        routingKey: 'update-project-state',
        queue: 'update-state'
    })
    async updateReservationState(message: { project_id: string, state: ReservationState }) {
        await this.reservationRepository.update({idProject: message.project_id}, {state: message.state})
    }

    async answerReservation(body: AnswerReservationDto, user: JwtUser) {
        const reservation = await this.reservationRepository.findOne({
            idPerformance: body.performance_id,
            idProject: body.project_id
        })
        if (!reservation) {
            throw new NotFoundException()
        }
        if (reservation.providerId !== user.id) {
            throw new ForbiddenException()
        }
        await this.reservationRepository.save({
            ...reservation,
            state: body.accepted ? ReservationState.ACCEPTED : ReservationState.REJECTED
        })
    }

}
