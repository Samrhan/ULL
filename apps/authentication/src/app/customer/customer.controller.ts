import {Controller, Get, Inject, Query, Res} from '@nestjs/common';
import {CustomerService} from "./customer.service";
import {AuthorizationCode} from "./interface/authorization-code.interface";

@Controller('customer')
export class CustomerController {

  @Inject() customerService: CustomerService

  @Get('callback')
  async callback(@Query() query: AuthorizationCode, @Res() res) {
    await this.customerService.login(query)
    return res.redirect('/api')
  }

  @Get('oauth')
  async getAuthorizationUrl(@Res() res) {
    return res.redirect(await this.customerService.getAuthorizationUrl());
  }
}
