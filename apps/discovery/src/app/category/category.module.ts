import {Module} from '@nestjs/common';
import {CategoryController} from './category.controller';
import {CategoryService} from './category.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entity/category.entity";
import {Provider} from "../shared/entity/provider.entity";
import {Review} from "../review/entity/review.entity";
import {Tag} from "../tag/entity/tag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Provider, Review, Tag])
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {
}
