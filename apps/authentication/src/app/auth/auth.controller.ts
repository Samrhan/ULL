import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
  @Inject() authService: AuthService;

  @Post('login')
  async login(@Body() body: any){
    return await this.authService.login(body)
  }
}
