import {Module} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {ProviderController} from './provider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {AuthModule} from "../auth/auth.module";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderAccount]),
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
          'provider': {
            prefetchCount: 15,
            default: true,
          },
        },
        uri: configService.get('rabbitmq.url'),
        connectionInitOptions: {wait: false},
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService]
})
export class ProviderModule {
}
