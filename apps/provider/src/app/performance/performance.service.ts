import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {CreatePerformanceDto} from './dto/create-performance.dto';
import {JwtUser, MinimalFile, Performance, PriceUnit, SectionType} from "@ull/api-interfaces";
import {InjectRepository} from "@nestjs/typeorm";
import {Section} from "../profile/entity/section.entity";
import {Repository} from "typeorm";
import {PerformanceEntity} from "./entity/performance.entity";
import {Provider} from "../profile/entity/provider.entity";
import {StorageService} from "@ull/storage";
import {PutPerformanceDto} from "./dto/put-performance.dto";
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";

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

    async update(performance: PutPerformanceDto, minimalFile: MinimalFile, user: JwtUser) {
        const oldPerformance = await this.performanceRepository.findOne(performance.performance_id, {relations: ['section', 'provider']})
        if (!oldPerformance) {
            throw new NotFoundException('Performance not found')
        }
        if (oldPerformance.deleted) {
            throw new ConflictException('Performance is already replaced by another one')
        }
        const newPerformance = {...oldPerformance};
        newPerformance.performanceParent = oldPerformance;
        delete newPerformance.idPerformance
        newPerformance.performanceTitle = performance.performance_title
        newPerformance.performanceDescription = performance.performance_description
        newPerformance.priceValue = performance.price_value
        newPerformance.priceUnit = performance.price_unit

        if (minimalFile) {
            await this.storageService.delete(oldPerformance.performancePicture, user)
            newPerformance.performancePicture = await this.storageService.upload(minimalFile, user)
        }
        oldPerformance.deleted = true
        oldPerformance.deletedAt = new Date();
        oldPerformance.yIndex = null;
        await this.performanceRepository.save([oldPerformance, newPerformance])
    }

    async delete(performanceId: string, user: JwtUser) {
        const performance = await this.performanceRepository.findOne(performanceId, {relations: ['provider']})

        if (!performance) {
            throw new NotFoundException('Performance not found')
        }
        if (performance.provider.id !== user.id) {
            throw new ForbiddenException('You are not allowed to delete this performance')
        }
        if (performance.deleted) {
            throw new BadRequestException('Performance is already deleted')
        }

        await this.storageService.delete(performance.performancePicture, user)
        performance.deleted = true
        performance.deletedAt = new Date();
        performance.yIndex = null;
        await this.performanceRepository.save(performance)
    }

    async getPerformance(performanceId: string): Promise<Performance> {
        const performance = await this.performanceRepository.findOne(performanceId, {relations: ['provider']})
        if (!performance) {
            throw new NotFoundException('Performance not found')
        }
        return {
            id_performance: performance.idPerformance,
            provider_id: performance.provider.id,
            performance_title: performance.performanceTitle,
            performance_description: performance.performanceDescription,
            picture: performance.performancePicture,
            price: {
                value: performance.priceValue,
                unit: PriceUnit[performance.priceUnit],
            },
            deleted: performance.deleted,
        }
    }

    @RabbitRPC({
        exchange: 'reservation',
        routingKey: 'check-reservation',
        queue: 'provider-reservation'
    })
    async checkPerformance(message: { id: string }) {
        try {
            const performance = await this.getPerformance(message.id)
            return {
                state: !performance.deleted,
                value: performance
            }
        } catch {
            return {state: false}
        }
    }
}
