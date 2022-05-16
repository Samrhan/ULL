import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class AuthService {
    @Inject() amqpConnection!: AmqpConnection;

    async validateUser(token: string): Promise<any> {
        const user = await this.amqpConnection.request<{ id: string, userType: string }>({
            exchange: 'auth',
            routingKey: 'check',
            payload: token,
            timeout: 10000
        })
        return user || null;
    }
}