import {Module} from '@nestjs/common';
import {ReservationController} from './reservation.controller';
import {ReservationService} from './reservation.service';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "./entity/reservation.entity";
import {ReservationStateEntity} from "./entity/reservation-state.entity";

@Module({
    imports: [RabbitMQModule.forRootAsync(RabbitMQModule, {
        imports: [ConfigModule, ConfigModule.forFeature(RabbitMQConfig)],
        useFactory: async (configService: ConfigService) => ({
            exchanges: [
                {
                    name: 'reservation',
                    type: 'topic',
                },
            ],
            channels: {
                'reservation': {
                    prefetchCount: 15,
                    default: true,
                },
            },
            uri: configService.get('rabbitmq.url'),
            connectionInitOptions: {wait: false},
        }),
        inject: [ConfigService]
    }),
        TypeOrmModule.forFeature([Reservation, ReservationStateEntity])],
    controllers: [ReservationController],
    providers: [ReservationService]
})
export class ReservationModule {
}
