import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from "./shared/database/database.module";
import {LocalAuthModule} from "@ull/auth";

@Module({
    imports: [
        AuthModule,
        DatabaseModule,
        LocalAuthModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
