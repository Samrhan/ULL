import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "./database.config";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRootAsync({
            inject: [ ConfigService ],
            imports: [ ConfigModule, ConfigModule.forFeature(databaseConfig) ],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                url: configService.get('database.url'),
                autoLoadEntities: true,
                synchronize: false, // Use migration instead
                migrationsRun: false, // Execute migration at startup
                namingStrategy: new SnakeNamingStrategy(),
                logging: [ 'error' ],
            }),
        }),
    ],
})
export class DatabaseModule {
}
