import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "./entity/tag.entity";
import {Category} from "../category/entity/category.entity";
import {Review} from "../review/entity/review.entity";
import {Provider} from "../shared/entity/provider.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Provider, Review, Category])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
