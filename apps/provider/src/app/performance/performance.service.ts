import {BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePerformanceDto} from './dto/create-performance.dto';
import {JwtUser, MinimalFile, SectionType} from "@ull/api-interfaces";
import {InjectRepository} from "@nestjs/typeorm";
import {Section} from "../profile/entity/section.entity";
import {Repository} from "typeorm";
import {PerformanceEntity} from "./entity/performance.entity";
import {Provider} from "../auth/entity/provider.entity";
import {StorageService} from "@ull/storage";

@Injectable()
export class PerformanceService {

    @Inject() storageService: StorageService;
    @InjectRepository(Section) sectionRepository: Repository<Section>
    @InjectRepository(Provider) providerRepository: Repository<Provider>
    @InjectRepository(PerformanceEntity) performanceRepository: Repository<PerformanceEntity>

    async createPerformance(performanceBody: CreatePerformanceDto, file: MinimalFile, user: JwtUser) {
        const section = await this.sectionRepository.findOne(performanceBody.id_section, {relations: ['provider', 'performances']})
        if (!section) {
            throw new NotFoundException('Section not found')
        }

        if (section.provider.id !== user.id) {
            throw new ForbiddenException('You are not allowed to create performance in this section')
        }

        if (section.type === SectionType.BIG && section.performances.length > 0) {
            throw new BadRequestException('You can only have one performance in a big section')
        }

        const performance = new PerformanceEntity()
        performance.performanceTitle = performanceBody.performance_title
        performance.performanceDescription = performanceBody.performance_description
        performance.priceValue = performanceBody.price_value
        performance.priceUnit = performanceBody.price_unit
        performance.section = section
        performance.provider = await this.providerRepository.findOneOrFail(user.id)
        performance.performancePicture = await this.storageService.upload(file, user)

        const maxYIndex = await this.performanceRepository.findOne({
            select: ['yIndex'],
            where: {section},
            order: {yIndex: 'DESC'}
        })
        performance.yIndex = maxYIndex ? maxYIndex.yIndex + 1 : 0

        return await this.performanceRepository.save(performance)
    }
}
