import {Module} from '@nestjs/common';
import {CustomerController} from './customer.controller';
import {CustomerService} from './customer.service';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {AuthModule} from "../auth/auth.module";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule, ConfigModule.forFeature(RabbitMQConfig)],
      useFactory: async (configService: ConfigService)=>({
        exchanges: [
          {
            name: 'customer',
            type: 'topic',
          },
        ],
        channels: {
          'customer': {
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
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {
}
