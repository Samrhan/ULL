import {BadRequestException, Body, Controller, Get, Inject, Param, Put, Query, UseGuards} from '@nestjs/common';
import {LocalAuthGuard, User} from "@ull/auth";
import {CategoryService} from "./category.service";
import {JwtUser} from "@ull/api-interfaces";
import {PutCategoryDto} from "./dto/put-category.dto";


@Controller()
@UseGuards(LocalAuthGuard)
export class CategoryController {
    @Inject() categoryService: CategoryService

    @Get('provider_category')
    async getAllProviderCategory() {
        return await this.categoryService.getAllProviderCategory()
    }

    @Get('provider_category/:id')
    async getProviderCategory(@Param('id') providerId: string) {
        return await this.categoryService.getProviderCategory(providerId)
    }

    @Put('provider_category')
    async putCategory(@Body() body: PutCategoryDto, @User() user: JwtUser) {
        await this.categoryService.putCategory(body, user)
    }

    @Get('recommend')
    async getRecommend(@Query('category') category: string, @Query('projectId') projectId: string, @User() user: JwtUser) {
        if (!category || !projectId) {
            throw new BadRequestException('category and projectId are required')
        }
        return await this.categoryService.getRecommend(category, projectId, user)
    }

    @Get('categories')
    async getCategories() {
        return await this.categoryService.getCategories()
    }
}
