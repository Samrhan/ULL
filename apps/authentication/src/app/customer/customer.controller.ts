import {Body, Controller, Inject, Post} from '@nestjs/common';
import {CustomerService} from "./customer.service";
import {OAuthDto} from "./dto/oauth.dto";

@Controller('')
export class CustomerController {

  @Inject() customerService: CustomerService

  @Post('oauth')
  async oauth(@Body() oauth: OAuthDto) {
    return await this.customerService.oauth(oauth)
  }
}
