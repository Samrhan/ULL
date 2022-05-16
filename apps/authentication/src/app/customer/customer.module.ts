import {Module} from '@nestjs/common';
import {CustomerController} from './customer.controller';
import {CustomerService} from './customer.service';
import {ConfigModule} from "@nestjs/config";
import {googleOauthConfig} from "./google-oauth.config";

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {
}
