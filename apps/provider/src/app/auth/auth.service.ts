import {BadRequestException, ConflictException, Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom} from "rxjs";
import {RegisterDto} from "./dto/register.dto";
import {Provider} from "./entity/provider.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {v4 as uuidv4} from 'uuid';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {RegisterProviderMessage} from "@ull/api-interfaces";

const DEFAULT_PROFILE_PIC = 'default'
const DEFAULT_COVER_PIC = 'default'

@Injectable()
export class AuthService {


  @Inject() amqpConnection: AmqpConnection
  @Inject() configService: ConfigService
  @Inject() httpService: HttpService

  @InjectRepository(Provider) providerRepository: Repository<Provider>;

  async getInseeToken(): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const request = await firstValueFrom(this.httpService.post<{ access_token: string, scope: string, token_type: string, expires_in: number }>('https://api.insee.fr/token',
      params,
      {
        headers: {
          Authorization: `Basic ${this.configService.get<string>('INSEE_TOKEN')}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }));
    return request.data.access_token
  }

  async checkSiren(siren: string): Promise<void> {
    try {
      await firstValueFrom(this.httpService.get(`https://api.insee.fr/entreprises/sirene/V3/siren/${siren}`,
        {
          headers: {
            Authorization: `Bearer ${await this.getInseeToken()}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }));
    } catch {
      throw new BadRequestException('Siren is not valid')
    }
  }

  async registerProvider(registerDto: RegisterDto, id?: string) {
    await this.checkSiren(registerDto.siren)

    const provider = new Provider();
    provider.id = id || uuidv4();
    provider.companyName = registerDto.company_name;
    provider.companyDescription = registerDto.company_description || '';
    provider.siren = registerDto.siren;
    provider.email = registerDto.email;
    provider.phoneNumber = registerDto.phone_number;
    provider.profilePicture = registerDto.profile_picture || DEFAULT_PROFILE_PIC;
    provider.coverPicture = registerDto.cover_picture || DEFAULT_COVER_PIC;
    provider.areaServed = registerDto.area_served  || '';

    try {
      await this.registerProviderAuthService({idProvider: provider.id, password: registerDto.password, email: registerDto.email});
      await this.providerRepository.save(provider);
    } catch (e) {
      throw new ConflictException('Siren, mail or phone are already used in another account.');
    }
  }

  async registerProviderAuthService(registerProvider: RegisterProviderMessage) {
    return await this.amqpConnection.request({
      exchange: 'provider',
      routingKey: 'register',
      payload: registerProvider,
      timeout: 10000
    });
  }
}
