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

@Injectable()
export class ProfileService {
    @Inject() storageService: StorageService;
    @Inject() configService: ConfigService;
    @InjectRepository(Section) sectionRepository: Repository<Section>;
    @InjectRepository(Provider) providerRepository: Repository<Provider>;
    @InjectRepository(PreviewAmount) previewAmountRepository: Repository<PreviewAmount>;
    @InjectRepository(BigSectionPicture) bigSectionPictureRepository: Repository<BigSectionPicture>;

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

    async updateIndex(idSections: string[], user: JwtUser) {
        const sections = await this.sectionRepository.find({select: ['sectionId'], where: {provider: user.id}})
        const dbIdSections = sections.map(s => s.sectionId)
        console.log(dbIdSections)
        if (JSON.stringify(dbIdSections) !== JSON.stringify(idSections)) {
            throw new BadRequestException('Missmatch between sections')
        }
        const newIndexes = sections.map((section) => ({
            sectionId: section.sectionId,
            yIndex: idSections.indexOf(section.sectionId)
        }))
        await this.sectionRepository.save(newIndexes)
    }

    async updateProfileOrder(profileOrder: PutOrderProfileDto[], user: JwtUser) {
        const sections = await this.sectionRepository.find({select: ['sectionId'], where: {provider: user.id}})
        const dbIdSections = sections.map(s => s.sectionId)
        const bodySections = profileOrder.map(p => p.id_section)
        console.log(dbIdSections, bodySections)
        console.log(ProfileService.equals(dbIdSections, bodySections));

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
