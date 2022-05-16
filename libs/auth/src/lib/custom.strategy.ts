import {Strategy} from 'passport-custom';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(req: any): Promise<any> {
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or bad formed Authorization Header');
        }
        const user = await this.authService.validateUser(req.headers.authorization.split(' ')[1]);
        if (!user.id) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
