import {Inject, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {JwtUser} from "@ull/api-interfaces";
import {AmqpConnection, RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {JwtStrategy} from "./jwt.strategy";

@Injectable()
export class AuthService {
  @Inject() jwtService: JwtService
  @Inject() amqpConnection: AmqpConnection
  @Inject() jwtStrategy: JwtStrategy

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'check',
    queue: 'auth'
  })
  async check(token: string) {
    try {
      let user = this.jwtService.verify(token)
      user = await this.jwtStrategy.validate(user)
      if (user) {
        return user;
      } else {
        return {id: undefined, userType: undefined};
      }
    } catch (e) {
      return {id: undefined, userType: undefined};
    }
  }

  getJwt(body: JwtUser) {
    return this.jwtService.sign(body)
  }
}
