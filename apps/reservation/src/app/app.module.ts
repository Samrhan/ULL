import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LocalAuthModule} from "@ull/auth";
import {ReservationModule} from './reservation/reservation.module';
import {DatabaseModule} from "./shared/database/database.module";

@Module({
    imports: [LocalAuthModule.forRoot(), ReservationModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
