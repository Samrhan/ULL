import {Controller, Post, UseGuards} from '@nestjs/common';
import {LocalAuthGuard, User} from '@ull/auth';
import {JwtUser} from "@ull/api-interfaces";

@Controller('')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('test')
    async test(@User() user: JwtUser) {
        return user;
    }
}
