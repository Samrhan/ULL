import {Injectable, NotFoundException} from '@nestjs/common';
import {Category} from "./entity/category.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Provider} from "../shared/entity/provider.entity";
import {PutCategoryDto} from "./dto/put-category.dto";
import {JwtUser} from "@ull/api-interfaces";

@Injectable()
export class CategoryService {
    @InjectRepository(Category) categoryRepository: Repository<Category>
    @InjectRepository(Provider) providerRepository: Repository<Provider>

    async getAllProviderCategory() {
        return (await this.categoryRepository.find()).map((c) => ({name: c.categoryName, picture: c.categoryPicture}))
    }

    async getProviderCategory(providerId: string) {
        const provider = await this.providerRepository.findOne(providerId, {relations: ['category']})
        if (!provider) {
            throw new NotFoundException()
        }
        return {name: provider.category.categoryName, picture: provider.category.categoryPicture}
    }

    async putCategory(body: PutCategoryDto, user: JwtUser) {
        const category = await this.categoryRepository.findOne(body.name)
        if (!category) {
            throw new NotFoundException()
        }

        let provider = await this.providerRepository.findOne(user.id, {relations: ['category']})
        if (!provider) {
            provider = new Provider()
            provider.idProvider = user.id
        }
        provider.category = category
        await this.providerRepository.save(provider)
    }
}
