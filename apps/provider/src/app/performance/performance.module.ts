import { Module } from '@nestjs/common';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Section} from "../profile/entity/section.entity";
import {BigSectionPicture} from "../profile/entity/big-section-picture.entity";
import {PreviewAmount} from "../profile/entity/preview-amount.entity";
import {PerformanceEntity} from "./entity/performance.entity";
import {TypeEnumEntity} from "../profile/entity/type-enum.entity";
import {Provider} from "../profile/entity/provider.entity";

@Module({
  controllers: [PerformanceController],
  providers: [PerformanceService],
  imports: [TypeOrmModule.forFeature([Section, BigSectionPicture, PreviewAmount, PerformanceEntity, TypeEnumEntity, Provider])]
})
export class PerformanceModule {}
