import {BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {StorageService} from "@ull/storage";
import {
    Address as IAddress,
    JwtUser,
    MinimalFile,
    Performance,
    PriceUnit,
    ProviderCompanyInformation,
    ProviderProfile,
    ProviderProfileSection,
    SectionType
} from "@ull/api-interfaces";
import {ConfigService} from "@nestjs/config";
import {UploadSectionDto} from "./dto/upload-section.dto";
import {Section} from "./entity/section.entity";
import {PreviewAmount} from "./entity/preview-amount.entity";
import {BigSectionPicture} from "./entity/big-section-picture.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Provider} from "./entity/provider.entity";
import {PutSectionDto} from "./dto/put-section.dto";
import {PutOrderProfileDto} from "./dto/put-order-profile.dto";
import {PerformanceEntity} from "../performance/entity/performance.entity";
import {Address} from "./entity/address.entity";
import {UpdateProfileDto} from "./dto/put-profile.dto";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {DEFAULT_COVER_PIC_PROVIDER, DEFAULT_PROFILE_PIC_PROVIDER} from "@ull/global-constants";

@Injectable()
export class ProfileService {
    @Inject() storageService: StorageService;
    @Inject() configService: ConfigService;
    @Inject() amqpConnection: AmqpConnection
    @InjectRepository(Section) sectionRepository: Repository<Section>;
    @InjectRepository(Provider) providerRepository: Repository<Provider>;
    @InjectRepository(PreviewAmount) previewAmountRepository: Repository<PreviewAmount>;
    @InjectRepository(BigSectionPicture) bigSectionPictureRepository: Repository<BigSectionPicture>;
    @InjectRepository(PerformanceEntity) performanceRepository: Repository<PerformanceEntity>;
    @InjectRepository(Address) addressRepository: Repository<Address>;

    async createSection(body: UploadSectionDto, files: MinimalFile[], user: JwtUser) {
        const section = new Section()
        section.type = body.type
        section.sectionTitle = body.section_title
        section.sectionDescription = body.section_description
        section.purchasable = body.purchasable === 'true'

        const maxYIndex = await this.sectionRepository.findOne({
            select: ['yIndex'],
            where: {provider: user.id},
            order: {yIndex: 'DESC'}
        })

        section.yIndex = maxYIndex ? maxYIndex.yIndex + 1 : 0
        section.provider = await this.providerRepository.findOne(user.id)

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

        if (section.type === SectionType.big) {
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
        section.purchasable = body.purchasable

        await this.sectionRepository.save(section)

        if (section.type === SectionType.small && section.previewAmount && section.previewAmount?.amount !== body.preview_amount) {
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
        if (section.type !== SectionType.big) {
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
        if (section.type !== SectionType.big) {
            throw new BadRequestException('This section is not big')
        }
        await this.storageService.delete(pictureId, user)
        await this.bigSectionPictureRepository.delete(picture)
    }

    async updateProfileOrder(profileOrder: PutOrderProfileDto[], user: JwtUser) {
        // Seems a little too complicated, but didn't find another way to do it

        const sections = await this.sectionRepository.createQueryBuilder('section')
            .select(['section.sectionId', 'section.yIndex', 'section.type', 'performances.idPerformance'])
            .leftJoinAndSelect('section.performances', 'performances', 'performances.deleted = :deleted', {deleted: false})
            .leftJoin('section.provider', 'provider')
            .where('provider.id = :providerId', {
                providerId: user.id
            })
            .getMany()

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

        for (let sectionIndex = 0; sectionIndex < profileOrder.length; sectionIndex++) {
            const section = sections.find(s => s.sectionId === profileOrder[sectionIndex].id_section)
            section.yIndex = sectionIndex

            for (let performanceIndex = 0; performanceIndex < profileOrder[sectionIndex].id_performances.length; performanceIndex++) {
                const idPerformance = profileOrder[sectionIndex].id_performances[performanceIndex];
                const performance = performances.find(p => p.idPerformance === idPerformance)

                performance.yIndex = performanceIndex
                performance.section = section

                if (performance.yIndex > 0 && performance.section.type === SectionType.big) {
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

    async getProfile(providerId: string): Promise<ProviderProfile> {
        const queryProfile = await this.providerRepository.createQueryBuilder('provider')
            .leftJoinAndSelect('provider.sections', 'sections')
            .leftJoinAndSelect('sections.performances', 'performances', 'performances.deleted = :deleted', {deleted: false})
            .leftJoinAndSelect('sections.bigSectionPictures', 'bigSectionPictures')
            .leftJoinAndSelect('sections.previewAmount', 'previewAmount')
            .where('provider.id = :providerId', {providerId})
            .getOne()
        if (!queryProfile) {
            throw new NotFoundException('Profile not found')
        }
        return <ProviderProfile>{
            id_provider: queryProfile.id,
            company_name: queryProfile.companyName,
            company_description: queryProfile.companyDescription,
            area_served: queryProfile.areaServed,
            cover_picture: queryProfile.coverPicture,
            profile_picture: queryProfile.profilePicture,
            rating: 0,
            services: queryProfile.sections.sort((a, b) => a.yIndex - b.yIndex).map<ProviderProfileSection>(s => ({
                id_section: s.sectionId,
                section_title: s.sectionTitle,
                section_description: s.sectionDescription,
                type: SectionType[s.type],
                purchasable: s.purchasable,
                preview_amount: s.previewAmount?.amount,
                pictures: s.bigSectionPictures?.map(p=>p.picture),
                content: s.performances.sort((a, b) => a.yIndex - b.yIndex).map<Performance>(p => ({
                    id_performance: p.idPerformance,
                    performance_title: p.performanceTitle,
                    performance_description: p.performanceDescription,
                    price: {
                        value: p.priceValue,
                        unit: PriceUnit[p.priceUnit],
                    },
                    picture: p.performancePicture,
                })),
            }))
        }
    }

    async getInfo(user: JwtUser): Promise<ProviderCompanyInformation> {
        const provider = await this.providerRepository.findOneOrFail(user.id, {relations: ['address']})
        return <ProviderCompanyInformation>{
            company_name: provider.companyName,
            company_description: provider.companyDescription,
            email: provider.email,
            phone: provider.phoneNumber,
            profile_picture: provider.profilePicture,
            cover_picture: provider.coverPicture,
            area_served: provider.areaServed,
            address: ProfileService.convertAddress(provider.address)
        }
    }

    private static convertAddress(address: Address): IAddress {
        return {
            number: address?.number,
            street: address?.street,
            city: address?.city,
            postal_code: address?.postalCode,
            complement: address?.complement
        }
    }

    async updateProfile(updateProfile: UpdateProfileDto, files: MinimalFile[], user: JwtUser) {
        const provider = await this.providerRepository.findOneOrFail(user.id, {relations: ['address']})

        provider.companyName = updateProfile.company_name
        provider.companyDescription = updateProfile.company_description
        if (provider.email.toLowerCase() !== updateProfile.email.toLowerCase()) {
            provider.email = updateProfile.email.toLowerCase()
            await this.amqpConnection.request({
                exchange: 'provider',
                routingKey: 'change-email',
                payload: {id: user.id, email: provider.email},
                timeout: 10000,
            });
        }
        provider.phoneNumber = updateProfile.phone
        provider.areaServed = updateProfile.area_served
        if (!provider.address) {
            provider.address = new Address()
        }
        provider.address.number = updateProfile.address_number;
        provider.address.street = updateProfile.address_street;
        provider.address.postalCode = updateProfile.address_postal_code;
        provider.address.city = updateProfile.address_city;
        provider.address.complement = updateProfile.address_complement;

        for(const file of files){
            switch (file.fieldname) {
                case 'profile_picture':
                    if (provider.profilePicture !== DEFAULT_PROFILE_PIC_PROVIDER) {
                        await this.storageService.delete(provider.profilePicture, user)
                    }
                    provider.profilePicture = await this.storageService.upload(file, user)
                    break;
                case 'cover_picture':
                    if (provider.coverPicture !== DEFAULT_COVER_PIC_PROVIDER) {
                        await this.storageService.delete(provider.coverPicture, user)
                    }
                    provider.coverPicture = await this.storageService.upload(file, user)
                    break;
            }
        }
        provider.address = await this.addressRepository.save(provider.address)
        await this.providerRepository.save(provider)
    }
}
