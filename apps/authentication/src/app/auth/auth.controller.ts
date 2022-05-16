import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {OAuthDto} from "./dto/oauth.dto";

@Controller('')
export class AuthController {
  @Inject() authService: AuthService;

  @Post('oauth')
  async login(@Body() oauth: OAuthDto){
    return await this.authService.oauth(oauth)
  }
}
