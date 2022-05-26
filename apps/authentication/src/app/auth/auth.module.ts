import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {HttpModule} from "@nestjs/axios";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProviderAccount} from "../provider/provider-account.entity";
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";
import {AuthConfig} from "./auth.config";

@Module({
  imports: [HttpModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule, ConfigModule.forFeature(RabbitMQConfig)],
      useFactory: async (configService: ConfigService)=>({
        exchanges: [
          {
            name: 'auth',
            type: 'topic',
          },
        ],
        channels: {
          'auth': {
            prefetchCount: 15,
            default: true,
          },
        },
        uri: configService.get<string>('rabbitmq.url'),
        connectionInitOptions: {wait: false},
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([ProviderAccount]),
    JwtModule.registerAsync({
      imports: [ConfigModule, ConfigModule.forFeature(AuthConfig)],
      useFactory: async (configService: ConfigService) => ({
        secret: Buffer.from(configService.get<string>('auth.secret'), 'base64'),
        signOptions: {expiresIn: '1y'},
      }),
      inject: [ConfigService]
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
