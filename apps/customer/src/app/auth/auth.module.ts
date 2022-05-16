import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Customer} from "./entity/customer.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'customer',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
    TypeOrmModule.forFeature([Customer])
  ]
})
export class AuthModule {}
