import {Injectable} from '@nestjs/common';
import {CheckUser, RegisterCustomerMessage} from "@ull/api-interfaces";
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {Customer} from "./entity/customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

const DEFAULT_PROFILE_PICTURE = 'test'

@Injectable()
export class AuthService {

  @InjectRepository(Customer) customerRepository: Repository<Customer>

  @RabbitRPC({
    exchange: 'customer',
    routingKey: 'id',
  })
  async getCustomerId(checkUser: CheckUser): Promise<{ id: string }> {
    const found = await this.customerRepository.findOne({oauthSub: checkUser.id})
    if (found)
      return {id: found.id}

    return {id: undefined};
  }


  @RabbitRPC({
    exchange: 'customer',
    routingKey: 'register',
  })
  async register(registerCustomer: RegisterCustomerMessage): Promise<{id: string}> {
    const customer = new Customer()
    customer.oauthSub = registerCustomer.oauth_sub;
    customer.lastname = registerCustomer.lastname;
    customer.firstname = registerCustomer.firstname;
    customer.email = registerCustomer.email;
    customer.profilePicture = DEFAULT_PROFILE_PICTURE;
    return {id: (await this.customerRepository.save(customer)).id};

  }
}
