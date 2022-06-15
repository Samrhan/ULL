import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoryModule} from './category/category.module';
import {TagModule} from './tag/tag.module';
import {ReviewModule} from './review/review.module';
import {DatabaseModule} from "./shared/database/database.module";
import {LocalAuthModule} from "@ull/auth";

@Module({
    imports: [CategoryModule, TagModule, ReviewModule, DatabaseModule, LocalAuthModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
