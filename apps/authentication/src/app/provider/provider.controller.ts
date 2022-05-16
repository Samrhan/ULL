import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ProviderService} from "./provider.service";
import {LoginDto} from "./dto/login.dto";
import {JwtOauthGuard} from "../auth/jwt-oauth.guard";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {User} from "@ull/auth";
import {JwtUser} from "@ull/api-interfaces";

@Controller('')
export class ProviderController {
  @Inject() private readonly providerService: ProviderService;

  @Post('login')
  async login(@Body() login: LoginDto) {
    return await this.providerService.login(login)
  }

  @UseGuards(JwtOauthGuard)
  @Post("changePassword")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @User() user: JwtUser) {
    return await this.providerService.changePassword(changePasswordDto, user)
  }
}
