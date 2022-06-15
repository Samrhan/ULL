import {ForbiddenException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
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
import {MailerService} from "@ull/mailer";
import {ResetPasswordDto} from "./dto/reset-password.dto";

const SALT_OR_ROUNDS = 10

@Injectable()
export class ProviderService {
    private logger = new Logger()

    @InjectRepository(ProviderAccount) providerAccountRepository: Repository<ProviderAccount>

    @Inject() authService: AuthService
    @Inject() httpService: HttpService
    @Inject() amqpConnection: AmqpConnection
    @Inject() mailerService: MailerService


    @RabbitRPC({
        exchange: 'provider',
        routingKey: 'register',
        queue: 'provider-auth',
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
                token_type: 'Bearer',
            };
        } else {
            throw new UnauthorizedException();
        }
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ access_token: string, token_type: string }> {
        let user = await this.providerAccountRepository.findOne({resetPasswordToken: resetPasswordDto.token})
        if (!user) {
            throw new NotFoundException('Token not found')
        }
        user = await this.providerAccountRepository.save({
            ...user,
            password: await bcrypt.hash(resetPasswordDto.new_password, SALT_OR_ROUNDS),
            jti: uuidv4(),
            resetPasswordToken: null
        })
        return {
            access_token: this.authService.getJwt({id: user.idProvider, userType: UserType.PROVIDER, jti: user.jti}),
            token_type: 'Bearer',
        }
    }

    async forgottenPassword(email: string) {
        const user = await this.providerAccountRepository.findOne({email})
        if (!user) {
            return;
        }
        user.resetPasswordToken = uuidv4();
        await this.providerAccountRepository.save(user)

        await this.mailerService.sendMail(user.email, 'Changement de mot de passe', `Token : ${user.resetPasswordToken}`)
    }


    async changePassword(changePasswordDto: ChangePasswordDto, jwtUser: JwtUser) {
        const user = await this.providerAccountRepository.findOne(jwtUser.id)
        if (!await bcrypt.compare(changePasswordDto.old_password, user.password)) {
            throw new ForbiddenException('Old password isn\'t matching')
        }
        user.password = await bcrypt.hash(changePasswordDto.new_password, SALT_OR_ROUNDS)
        user.jti = uuidv4()
        user.resetPasswordToken = null
        await this.providerAccountRepository.save(user)
        return {
            access_token: this.authService.getJwt({id: user.idProvider, userType: UserType.PROVIDER, jti: user.jti}),
            token_type: 'Bearer',
        }
    }

    @RabbitRPC({
        exchange: 'provider',
        routingKey: 'change-email',
        queue: 'provider-profile'
    })
    async changeEmail(message: { id: string, email: string }) {
        const provider = await this.providerAccountRepository.findOne(message.id, {select: ["email", "idProvider"]})
        provider.email = message.email
        await this.providerAccountRepository.save(provider)
        return provider
    }
}
