import {Module} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {ProviderController} from './provider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderAccount]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'provider',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: {wait: false},
    }),],
  providers: [ProviderService],
  controllers: [ProviderController]
})
export class ProviderModule {
}
