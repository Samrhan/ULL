import {Module} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {ProviderController} from './provider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderAccount])],
  providers: [ProviderService],
  controllers: [ProviderController]
})
export class ProviderModule {
}
