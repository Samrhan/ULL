import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Customer} from "../auth/entity/customer.entity";
import {Project} from "./entity/project.entity";
import {Favorite} from "../favorite/entity/favorite.entity";
import {ProjectStateEntity} from "./entity/project-state.entity";
import {Address} from "./entity/address.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Project, Favorite, ProjectStateEntity, Address]),
        RabbitMQModule.forRootAsync(RabbitMQModule, {
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
        })],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {
}
