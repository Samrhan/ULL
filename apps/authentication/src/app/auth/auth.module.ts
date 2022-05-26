import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from './auth.controller';
import {HttpModule} from "@nestjs/axios";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";

@Module({
  providers: [AuthService],
  imports: [JwtModule.register({
    secret: 'test',
    // signOptions: { expiresIn: '7d' },
  }), HttpModule,
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
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
