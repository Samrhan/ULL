import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from "./shared/database/database.module";
import {LocalAuthModule} from "@ull/auth";
import {ProfileModule} from './profile/profile.module';
import {StorageModule} from "@ull/storage";
import {ConfigModule} from "@nestjs/config";
import {PerformanceModule} from './performance/performance.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    LocalAuthModule.forRoot(),
    StorageModule.forRoot(),
    ConfigModule.forRoot(),
    ProfileModule,
    PerformanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
