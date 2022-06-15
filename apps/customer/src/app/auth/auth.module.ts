import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Customer} from "./entity/customer.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RabbitMQConfig} from "@ull/config";
import {Project} from "../project/entity/project.entity";
import {Favorite} from "../favorite/entity/favorite.entity";
import {ProjectStateEntity} from "../project/entity/project-state.entity";
import {Address} from "../project/entity/address.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([Customer, Project, Favorite, ProjectStateEntity, Address]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule, ConfigModule.forFeature(RabbitMQConfig)],
      useFactory: async (configService: ConfigService)=>({
        exchanges: [
          {
            name: 'customer',
            type: 'topic',
          },
        ],
        channels: {
          'customer': {
            prefetchCount: 15,
            default: true,
          },
        },
        uri: configService.get('rabbitmq.url'),
        connectionInitOptions: {wait: false},
      }),
      inject: [ConfigService]
    }),
  ]
})
export class AuthModule {}
