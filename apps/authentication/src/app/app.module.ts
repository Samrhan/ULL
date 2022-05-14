import {Module} from '@nestjs/common';

import {DatabaseModule} from './shared/database/database.module';
import {ProviderModule} from "./provider/provider.module";

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
