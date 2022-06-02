import {Inject, Injectable} from '@nestjs/common';
import {OAuthDto} from "../auth/dto/oauth.dto";
import {firstValueFrom} from "rxjs";
import {RegisterCustomerMessage, UserType} from "@ull/api-interfaces";
import {HttpService} from "@nestjs/axios";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class CustomerService {
    @Inject() authService: AuthService
    @Inject() httpService: HttpService
    @Inject() amqpConnection: AmqpConnection

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
            access_token: this.authService.getJwt({id, userType: UserType.CUSTOMER}),
            token_type: 'Bearer',
        };
    }

    async checkCustomer(customer: OAuthDto): Promise<string> {
        return (await this.amqpConnection.request<{ id: string }>({
            exchange: 'customer',
            routingKey: 'id',
            payload: customer,
            timeout: 10000
        })).id;
    }

    async registerCustomer(registerCustomer: RegisterCustomerMessage): Promise<{ id: string }> {
        return await this.amqpConnection.request({
            exchange: 'customer',
            routingKey: 'register',
            payload: registerCustomer,
            timeout: 10000
        });
    }
}
