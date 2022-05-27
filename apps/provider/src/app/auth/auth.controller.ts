import {Body, Controller, Inject, Logger, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('')
export class AuthController {

  @Inject() authService: AuthService

  private logger = new Logger()

  @Post('register')
  @UsePipes(new ValidationPipe({transform: true, disableErrorMessages: false}))
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('New Request')
    await this.authService.registerProvider(registerDto)
  }
}
