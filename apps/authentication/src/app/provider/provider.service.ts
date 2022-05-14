import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";
import {Repository} from "typeorm";
import {RegisterMessage} from "@ull/api-interfaces";
import * as bcrypt from "bcrypt";

const SALT_OR_ROUNDS = 10

@Injectable()
export class ProviderService {
  @InjectRepository(ProviderAccount) providerAccountRepository: Repository<ProviderAccount>

  async register(registerMessage: RegisterMessage) {
    const user = await this.providerAccountRepository.save(
      {
        ...registerMessage,
        password: await bcrypt.hash(registerMessage.password, SALT_OR_ROUNDS)
      })
    delete user.password
    return user;
  }
}
