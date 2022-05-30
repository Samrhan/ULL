import {Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Section} from "./entity/section.entity";
import {PreviewAmount} from "./entity/preview-amount.entity";
import {BigSectionPicture} from "./entity/big-section-picture.entity";
import {TypeEnumEntity} from "./entity/type-enum.entity";
import {Provider} from "../auth/entity/provider.entity";
import {PerformanceEntity} from "../performance/entity/performance.entity";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Section, PreviewAmount, BigSectionPicture, TypeEnumEntity, Provider, PerformanceEntity])]
})
export class ProfileModule {}
