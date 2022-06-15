import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Provider} from "../shared/entity/provider.entity";
import {Tag} from "./entity/tag.entity";
import {JwtUser} from "@ull/api-interfaces";

@Injectable()
export class TagService {
    @InjectRepository(Tag) tagRepository: Repository<Tag>
    @InjectRepository(Provider) providerRepository: Repository<Provider>

    async getAllTags(): Promise<string[]> {
        return (await this.tagRepository.find()).map((t) => t.tagName)
    }

    async getProviderTags(providerId: string): Promise<string[]> {
        const provider = await this.providerRepository.findOne(providerId, {relations: ['tags']})
        if (!provider) {
            return []
        }
        return provider.tags.map((t) => t.tagName)
    }

    async editTags(tagNames: string[], user: JwtUser) {
        const tags = await this.tagRepository.find({where: {tagName: In(tagNames)}})
        let provider = await this.providerRepository.findOne(user.id, {relations: ['tags']})
        if (!provider) {
            provider = new Provider()
            provider.idProvider = user.id
        }
        provider.tags = tags;
        await this.providerRepository.save(provider)
    }
}
