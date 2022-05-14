import {BadRequestException, Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom} from "rxjs";
import {RegisterDto} from "./dto/register.dto";
import {Provider} from "./entity/provider.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";
import {v4 as uuidv4} from 'uuid';

const DEFAULT_PROFILE_PIC = 'default'
const DEFAULT_COVER_PIC = 'default'

@Injectable()
export class AuthService implements OnApplicationBootstrap {

  private logger = new Logger()

  constructor(private httpService: HttpService, private configService: ConfigService) {
  }

  @Client({
    transport: Transport.RMQ, options: {
      queue: 'provider', queueOptions: {
        durable: false
      },
    }
  })
  client: ClientProxy;

  async onApplicationBootstrap() {
    await this.client.connect();
  }

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

  async checkSiren(siren: string): Promise<boolean> {
    try {
      await firstValueFrom(this.httpService.get(`https://api.insee.fr/entreprises/sirene/V3/siren/${siren}`,
        {
          headers: {
            Authorization: `Bearer ${await this.getInseeToken()}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }));
      return true
    } catch {
      return false
    }
  }

  async register(registerDto: RegisterDto) {
    if (!await this.checkSiren(registerDto.siren)) {
      throw new BadRequestException('Siren is not valid')
    }

    const provider = new Provider();
    provider.id = uuidv4();
    provider.companyName = registerDto.company_name;
    provider.companyDescription = registerDto.company_description || '';
    provider.siren = registerDto.siren;
    provider.email = registerDto.email;
    provider.phoneNumber = registerDto.phone_number;
    provider.profilePicture = registerDto.profile_picture || DEFAULT_PROFILE_PIC;
    provider.coverPicture = registerDto.cover_picture || DEFAULT_COVER_PIC;
    provider.areaServed = registerDto.area_served  || '';

    try {
      await firstValueFrom(this.client.send("register", {idProvider: provider.id, password: registerDto.password, email: registerDto.email}));
      await this.providerRepository.save(provider)
    } catch (e) {
      this.logger.error(e)
      throw new BadRequestException('Siren, mail or phone are already used in another account.')
    }
  }
}
