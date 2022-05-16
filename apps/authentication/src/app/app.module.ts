import {Module} from '@nestjs/common';

import {DatabaseModule} from './shared/database/database.module';
import {ProviderModule} from "./provider/provider.module";
import {CustomerModule} from './customer/customer.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [DatabaseModule,
    ProviderModule,
    CustomerModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
