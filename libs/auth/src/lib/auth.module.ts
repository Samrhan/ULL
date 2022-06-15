import {DynamicModule, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {PassportModule} from "@nestjs/passport";
import {CustomStrategy} from "./custom.strategy";

@Module({
    imports: [RabbitMQModule.forRoot(RabbitMQModule, {
        exchanges: [
            {
                name: 'auth',
                type: 'topic',
            },
        ],
        uri: process.env['RABBITMQ_URI'] || 'amqp://localhost:5672',
        connectionInitOptions: {wait: false},
    }),
    PassportModule],
    providers: [AuthService, CustomStrategy],
})
export class LocalAuthModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: LocalAuthModule,
            providers: [CustomStrategy]
        };
    }
}
