import {BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {StorageService} from "@ull/storage";
import {JwtUser, MinimalFile, SectionType} from "@ull/api-interfaces";
import {ConfigService} from "@nestjs/config";
import {UploadSectionDto} from "./dto/upload-section.dto";
import {Section} from "./entity/section.entity";
import {PreviewAmount} from "./entity/preview-amount.entity";
import {BigSectionPicture} from "./entity/big-section-picture.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Provider} from "../auth/entity/provider.entity";
import {PutSectionDto} from "./dto/put-section.dto";
import {PutOrderProfileDto} from "./dto/put-order-profile.dto";
import {PerformanceEntity} from "../performance/entity/performance.entity";

@Injectable()
export class ProfileService {
    @Inject() storageService: StorageService;
    @Inject() configService: ConfigService;
    @InjectRepository(Section) sectionRepository: Repository<Section>;
    @InjectRepository(Provider) providerRepository: Repository<Provider>;
    @InjectRepository(PreviewAmount) previewAmountRepository: Repository<PreviewAmount>;
    @InjectRepository(BigSectionPicture) bigSectionPictureRepository: Repository<BigSectionPicture>;
    @InjectRepository(PerformanceEntity) performanceRepository: Repository<PerformanceEntity>;

    async createSection(body: UploadSectionDto, files: MinimalFile[], user: JwtUser) {
        const section = new Section()
        section.type = body.type
        section.sectionTitle = body.section_title
        section.sectionDescription = body.section_description
        section.purchasable = body.purchasable === 'true'
        section.yIndex = body.y_index
        section.provider = await this.providerRepository.findOne(user.id)

        const checkYIndex = await this.sectionRepository.find({
            where: {
                provider: section.provider,
                yIndex: body.y_index
            }
        });

        if (checkYIndex.length > 0) {
            throw new BadRequestException('Y index already used')
        }

        const insertedSection = await this.sectionRepository.save(section)
        if (body.preview_amount) {
            const previewAmount = new PreviewAmount()
            previewAmount.amount = body.preview_amount
            previewAmount.sectionId = insertedSection.sectionId
            section.previewAmount = previewAmount
            await this.previewAmountRepository.save(previewAmount)
        }
        if (files.length) {
            const sectionPictures: BigSectionPicture[] = []
            for (const file of files) {
                const fileName = await this.storageService.upload(file, user)
                const sectionPicture = new BigSectionPicture()
                sectionPicture.picture = fileName
                sectionPicture.sectionId = insertedSection.sectionId
                sectionPictures.push(sectionPicture)
            }
            await this.bigSectionPictureRepository.save(sectionPictures)
        }
    }

    async deleteSection(sectionId: string, user: JwtUser) {
        const section = await this.sectionRepository.findOne(sectionId, {relations: ['provider', 'bigSectionPictures']})

        if (!section) {
            throw new NotFoundException('Section not found')
        }

        if (section.provider?.id !== user.id) {
            throw new ForbiddenException('You are not allowed to delete this section')
        }

        if (section.type === SectionType.BIG) {
            for (const bigPictures of section.bigSectionPictures) {
                await this.storageService.delete(bigPictures.picture, user)
            }
        }

        await this.sectionRepository.delete(sectionId)
    }

    async putSection(body: PutSectionDto, user: JwtUser) {
        const section = await this.sectionRepository.findOne(body.id_section, {relations: ['provider', 'bigSectionPictures', 'previewAmount']})

        if (!section) {
            throw new NotFoundException('Section not found')
        }
        if (section.provider?.id !== user.id) {
            throw new ForbiddenException('You are not allowed to edit this section')
        }

        section.sectionTitle = body.section_title
        section.sectionDescription = body.section_description
        section.purchasable = body.purchasable === 'true'
        section.yIndex = body.y_index

        const checkYIndex = await this.sectionRepository.find({
            where: {
                provider: section.provider,
                yIndex: body.y_index
            }
        });

        if (checkYIndex.length > 0) {
            throw new BadRequestException('Y index already taken')
        }

        await this.sectionRepository.save(section)

        if (section.type === SectionType.SMALL && section.previewAmount && section.previewAmount?.amount !== body.preview_amount) {
            await this.previewAmountRepository.update(section.sectionId, {amount: body.preview_amount})
        }
    }

    async addPicture(sectionId: string, files: MinimalFile[], user: JwtUser) {
        const section = await this.sectionRepository.findOne(sectionId, {relations: ['provider', 'bigSectionPictures']})
        if (!section) {
            throw new NotFoundException('Section not found')
        }
        if (section.provider?.id !== user.id) {
            throw new ForbiddenException('You are not allowed to edit this section')
        }
        if (section.type !== SectionType.BIG) {
            throw new BadRequestException('This section is not big')
        }
        if (files.length) {
            const sectionPictures: BigSectionPicture[] = []
            for (const file of files) {
                const fileName = await this.storageService.upload(file, user)
                const sectionPicture = new BigSectionPicture()
                sectionPicture.picture = fileName
                sectionPicture.sectionId = section.sectionId
                sectionPictures.push(sectionPicture)
            }
            await this.bigSectionPictureRepository.save(sectionPictures)
        }
    }

    async deletePicture(sectionId: string, pictureId: string, user: JwtUser) {
        const section = await this.sectionRepository.findOne(sectionId, {relations: ['provider', 'bigSectionPictures']})
        if (!section) {
            throw new NotFoundException('Section not found')
        }
        const picture = section.bigSectionPictures?.find(bsp => bsp.picture === pictureId)
        if (!picture) {
            throw new NotFoundException('Picture not found')
        }
        if (section.provider?.id !== user.id) {
            throw new ForbiddenException('You are not allowed to edit this section')
        }
        if (section.type !== SectionType.BIG) {
            throw new BadRequestException('This section is not big')
        }
        await this.storageService.delete(pictureId, user)
        await this.bigSectionPictureRepository.delete(picture)
    }

    async updateProfileOrder(profileOrder: PutOrderProfileDto[], user: JwtUser) {
        // Seems a little too complicated, but didn't find another way to do it
        const sections = await this.sectionRepository.find({
            select: ['sectionId', 'yIndex', 'type'],
            where: {provider: user.id},
            relations: ['performances']
        })
        const dbIdSections = sections.map(s => s.sectionId)
        const bodySections = profileOrder.map(p => p.id_section)
        if (!ProfileService.equals(dbIdSections, bodySections)) {
            throw new BadRequestException('Missmatch between sections')
        }

        const performances = sections.map(s => s.performances).flat(1)
        const idPerformances = performances.map(p => p.idPerformance)
        const bodyPerformances = profileOrder.map(p => p.id_performances).flat(1)
        if (!ProfileService.equals(idPerformances, bodyPerformances)) {
            throw new BadRequestException('Missmatch between performances')
        }

        for (let sectionIndex = 0; sectionIndex < profileOrder.length; sectionIndex++){
            const section = sections.find(s => s.sectionId === profileOrder[sectionIndex].id_section)
            section.yIndex = sectionIndex

            for (let performanceIndex = 0; performanceIndex < profileOrder[sectionIndex].id_performances.length; performanceIndex++){
                const idPerformance = profileOrder[sectionIndex].id_performances[performanceIndex];
                const performance = performances.find(p => p.idPerformance === idPerformance)

                performance.yIndex = performanceIndex
                performance.section = section

                if (performance.yIndex > 0 && performance.section.type === SectionType.BIG) {
                    throw new BadRequestException('You can not add more than 1 performance to big sections')
                }
            }

            // Avoid nested tabs
            delete section.performances
        }

        await this.sectionRepository.save(sections)
        await this.performanceRepository.save(performances)
    }

    private static equals(a: string[], b: string[]): boolean {
        if (a.length !== b.length) return false;
        const uniqueValues = new Set([...a, ...b]);
        for (const v of uniqueValues) {
            const aCount = a.filter(e => e === v).length;
            const bCount = b.filter(e => e === v).length;
            if (aCount !== bCount) return false;
        }
        return true;
    }
}
