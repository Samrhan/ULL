import {Module} from '@nestjs/common';

import {DatabaseModule} from './shared/database/database.module';
import {ProviderModule} from "./provider/provider.module";
import {CustomerModule} from './customer/customer.module';
import {AuthModule} from './auth/auth.module';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [DatabaseModule,
    ProviderModule,
    CustomerModule,
    AuthModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'customer',
          type: 'topic',
        },
        {
          name: 'provider',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: {wait: false},
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
