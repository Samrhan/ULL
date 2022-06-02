import {Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Section} from "./entity/section.entity";
import {PreviewAmount} from "./entity/preview-amount.entity";
import {BigSectionPicture} from "./entity/big-section-picture.entity";
import {TypeEnumEntity} from "./entity/type-enum.entity";
import {Provider} from "./entity/provider.entity";
import {PerformanceEntity} from "../performance/entity/performance.entity";
import {Address} from "./entity/address.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {RabbitMQConfig} from "@ull/config";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([
                Section,
                PreviewAmount,
                BigSectionPicture,
                TypeEnumEntity,
                Provider,
                PerformanceEntity,
                Address,
            ]
        ),
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule, ConfigModule.forFeature(RabbitMQConfig)],
            useFactory: async (configService: ConfigService)=>({
                exchanges: [
                    {
                        name: 'provider',
                        type: 'topic',
                    },
                ],
                channels: {
                    'provider-profile': {
                        prefetchCount: 15,
                        default: true,
                    },
                },
                uri: configService.get('rabbitmq.url'),
                connectionInitOptions: {wait: false},
            }),
            inject: [ConfigService]
        }),]
})
export class ProfileModule {
}
