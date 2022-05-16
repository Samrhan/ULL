import {Inject, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {RegisterCustomerMessage} from "@ull/api-interfaces";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {OAuthDto} from "./dto/oauth.dto";

@Injectable()
export class AuthService {
  @Inject() jwtService: JwtService
  @Inject() httpService: HttpService
  @Inject() amqpConnection: AmqpConnection

  async validateUser(username: string, pass: string): Promise<any> {
    return null;
  }

  async checkCustomer(customer: any) {
    return (await this.amqpConnection.request<{ id: string }>({
      exchange: 'customer',
      routingKey: 'id',
      payload: customer,
      timeout: 10000
    })).id;
  }

  async registerCustomer(registerCustomer: RegisterCustomerMessage) {
    return await this.amqpConnection.request({
      exchange: 'customer',
      routingKey: 'register',
      payload: registerCustomer,
      timeout: 10000
    });
  }

  async oauth(customer: OAuthDto) {
    let id = await this.checkCustomer(customer)
    if (!id) {
      const userData = await firstValueFrom(this.httpService.get("https://people.googleapis.com/v1/people/me?personFields=names", {headers: {Authorization: customer.access_token}}))
      id = (await this.registerCustomer({
        oauth_sub: customer.id,
        lastname: userData.data.names[0].familyName || '',
        firstname: userData.data.names[0].givenName || '',
        email: customer.email,
      })).id as string
    }

    return {
      access_token: this.jwtService.sign({id}),
    };
  }


}
