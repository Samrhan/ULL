import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from "./shared/database/database.module";

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {
}
