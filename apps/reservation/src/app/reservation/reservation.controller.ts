import {Body, Controller, Delete, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {LocalAuthGuard, User, UserGuard} from "@ull/auth";
import {PostReservationDto} from "./dto/post-reservation.dto";
import {ReservationService} from "./reservation.service";
import {JwtUser, UserType} from "@ull/api-interfaces";
import {AnswerReservationDto} from "./dto/answer-reservation.dto";

@Controller()
@UseGuards(LocalAuthGuard)
export class ReservationController {
    @Inject() reservationService: ReservationService;

    @Post('reservation')
    async addReservation(@Body() body: PostReservationDto, @User() user: JwtUser) {
        await this.reservationService.addReservation(body, user)
    }

    @Delete('reservation/:project_id/:performance_id')
    async deleteReservation(@Param('project_id') projectId: string, @Param('performance_id') performanceId: string, @User() user: JwtUser) {
        return await this.reservationService.deleteReservation(projectId, performanceId, user)
    }

    @Get('reservation/:project_id/:performance_id')
    async getReservationDetails(@Param('project_id') projectId: string, @Param('performance_id') performanceId: string, @User() user: JwtUser) {
        return await this.reservationService.getReservationDetail(projectId, performanceId, user)
    }

    @Get('all_reservations/:project_id')
    async getAllReservation(@Param('project_id') projectId: string, @User() user: JwtUser) {
        return await this.reservationService.getAllReservation(projectId, user)
    }

    @Get('requested_provider_reservations')
    async getRequestedProviderReservation(@User() user: JwtUser) {
        return await this.reservationService.getRequestProviderReservations(user)
    }

    @UseGuards(UserGuard(UserType.PROVIDER))
    @Get('provider_reservations')
    async getProviderReservations(@User() user: JwtUser) {
        return await this.reservationService.getProviderReservations(user)
    }

    @UseGuards(UserGuard(UserType.PROVIDER))
    @Post('answer_reservation_request')
    async answerReservation(@Body() body: AnswerReservationDto, @User() user: JwtUser) {
        return await this.reservationService.answerReservation(body, user)
    }


}
