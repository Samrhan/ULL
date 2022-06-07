import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from "./shared/database/database.module";
import {LocalAuthModule} from "@ull/auth";
import { ProjectModule } from './project/project.module';
import { FavoriteModule } from './favorite/favorite.module';
import {StorageModule} from "@ull/storage";

@Module({
    imports: [
        AuthModule,
        DatabaseModule,
        LocalAuthModule.forRoot(),
        ProjectModule,
        FavoriteModule,
        StorageModule.forRoot()
    ],
})
export class AppModule {
}
