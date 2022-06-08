import {Module} from '@nestjs/common';
import {PerformanceController} from './performance.controller';
import {PerformanceService} from './performance.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Section} from "../profile/entity/section.entity";
import {BigSectionPicture} from "../profile/entity/big-section-picture.entity";
import {PreviewAmount} from "../profile/entity/preview-amount.entity";
import {PerformanceEntity} from "./entity/performance.entity";
import {TypeEnumEntity} from "../profile/entity/type-enum.entity";
import {Provider} from "../profile/entity/provider.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";

@Module({
    controllers: [PerformanceController],
    providers: [PerformanceService],
    imports: [TypeOrmModule.forFeature([Section, BigSectionPicture, PreviewAmount, PerformanceEntity, TypeEnumEntity, Provider]),
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
        })
    ]
})
export class PerformanceModule {
}
