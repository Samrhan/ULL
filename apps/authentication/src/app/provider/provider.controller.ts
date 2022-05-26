import {Controller, Inject} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {RegisterProviderMessage} from "@ull/api-interfaces";
import {ProviderService} from "./provider.service";

@Controller('provider')
export class ProviderController {
  @Inject() private readonly providerService: ProviderService;

  @MessagePattern('register', {queue: 'provider'})
  async registerProvider(@Payload() registerMessage: RegisterProviderMessage, @Ctx() context: RmqContext) {
    return await this.providerService.register(registerMessage)
  }
}
