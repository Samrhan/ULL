import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entity/provider.entity";

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), TypeOrmModule.forFeature([Provider])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
