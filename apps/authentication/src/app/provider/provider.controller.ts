import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ProviderService} from "./provider.service";
import {LoginDto} from "./dto/login.dto";
import {JwtOauthGuard} from "../auth/jwt-oauth.guard";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {User, UserGuard} from "@ull/auth";
import {JwtUser, UserType} from "@ull/api-interfaces";
import {ResetPasswordDto} from "./dto/reset-password.dto";

@Controller('')
export class ProviderController {
  @Inject() private readonly providerService: ProviderService;

  @Post('login')
  async login(@Body() login: LoginDto) {
    return await this.providerService.login(login)
  }

  @Post("reset_password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.providerService.resetPassword(resetPasswordDto)
  }

  @UseGuards(JwtOauthGuard, UserGuard(UserType.PROVIDER))
  @Post("change_password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @User() user: JwtUser) {
    return await this.providerService.changePassword(changePasswordDto, user)
  }

  @Post("forgotten_password")
  async forgottenPassword(@Body('email') email: string) {
    return await this.providerService.forgottenPassword(email)
  }
}
