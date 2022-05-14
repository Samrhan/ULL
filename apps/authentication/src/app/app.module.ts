import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from './shared/database/database.module';
import {ProviderModule} from "./provider/provider.module";

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
