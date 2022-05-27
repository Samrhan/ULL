import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entity/provider.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {RabbitMQConfig} from "@ull/config";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Provider]),
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
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
