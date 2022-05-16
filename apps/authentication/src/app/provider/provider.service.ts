import {ForbiddenException, Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";
import {Repository} from "typeorm";
import {JwtUser, RegisterProviderMessage, UserType} from "@ull/api-interfaces";
import * as bcrypt from "bcrypt";
import {AmqpConnection, RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {HttpService} from "@nestjs/axios";
import {LoginDto} from "./dto/login.dto";
import {AuthService} from "../auth/auth.service";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {v4 as uuidv4} from 'uuid';

const SALT_OR_ROUNDS = 10

@Injectable()
export class ProviderService {
  private logger = new Logger()

  @InjectRepository(ProviderAccount) providerAccountRepository: Repository<ProviderAccount>

  @Inject() authService: AuthService
  @Inject() httpService: HttpService
  @Inject() amqpConnection: AmqpConnection


  @RabbitRPC({
    exchange: 'provider',
    routingKey: 'register',
    queue: 'provider'
  })
  async registerProvider(registerMessage: RegisterProviderMessage) {
    const {password, ...user} = {
      ...await this.providerAccountRepository.save(
        {
          ...registerMessage,
          password: await bcrypt.hash(registerMessage.password, SALT_OR_ROUNDS)
        })
    }
    this.logger.log(`Registering new provider with id : ${user.idProvider}`)
    return user;
  }

  async login(login: LoginDto) {
    const user = await this.providerAccountRepository.findOne({where: {email: login.email}});
    if (!user) {
      throw new UnauthorizedException();
    }
    if (await bcrypt.compare(login.password, user.password)) {
      return {
        access_token: this.authService.getJwt(<JwtUser>{
          id: user.idProvider,
          userType: UserType.PROVIDER,
          jti: user.jti
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }


  async getUser(id): Promise<ProviderAccount> {
    return await this.providerAccountRepository.findOne(id)
  }

  async changePassword(changePasswordDto: ChangePasswordDto, reqUser: any): Promise<{ access_token: string }> {
    let user = await this.getUser(reqUser.id);
    if (changePasswordDto.old_password === changePasswordDto.new_password) {
      throw new ForbiddenException('Old and new password must me different')
    }
    if (!await bcrypt.compare(changePasswordDto.old_password, user.password)) {
      throw new ForbiddenException('Old password is not matching your password')
    }
    user = await this.providerAccountRepository.save({
      ...user,
      password: await bcrypt.hash(changePasswordDto.new_password, SALT_OR_ROUNDS),
      jti: uuidv4()
    })
    return {access_token: this.authService.getJwt({id: user.idProvider, userType: UserType.PROVIDER, jti: user.jti})}
  }
}
