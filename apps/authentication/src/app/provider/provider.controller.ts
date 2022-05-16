import {Controller, Inject} from '@nestjs/common';
import {ProviderService} from "./provider.service";

@Controller('provider')
export class ProviderController {
  @Inject() private readonly providerService: ProviderService;

}
