import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtUser, UserType} from "@ull/api-interfaces";
import {InjectRepository} from "@nestjs/typeorm";
import {ProviderAccount} from "../provider/provider-account.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  @InjectRepository(ProviderAccount) providerAccountRepository: Repository<ProviderAccount>

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(configService.get<string>('JWT_SECRET_KEY_BASE64'), 'base64'),
    });
  }

  async validate(payload: JwtUser): Promise<JwtUser> {
    const user = await this.providerAccountRepository.findOne(payload.id);
    if (!user || payload.userType === UserType.PROVIDER && user.jti !== payload.jti) {
      throw new UnauthorizedException()
    }
    else if(payload.userType === UserType.PROVIDER)
      return {id: payload.id, userType: payload.userType, jti: user.jti};
    else
      return {id: payload.id, userType: payload.userType};
  }
}
