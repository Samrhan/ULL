import {Inject, Injectable} from '@nestjs/common';
import {StorageService} from "@ull/storage";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {ConfigService} from "@nestjs/config";
import {UploadSectionDto} from "./dto/upload-section.dto";
import {Section} from "./entity/section.entity";
import {PreviewAmount} from "./entity/preview-amount.entity";
import {BigSectionPicture} from "./entity/big-section-picture.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ProfileService {
  @Inject() storageService: StorageService;
  @Inject() configService: ConfigService;
  @InjectRepository(Section) sectionRepository: Repository<Section>;
  @InjectRepository(PreviewAmount) previewAmountRepository: Repository<PreviewAmount>;
  @InjectRepository(BigSectionPicture) bigSectionPictureRepository: Repository<BigSectionPicture>;

  async upload(file: MinimalFile, user: JwtUser) {
    const fileName = await this.storageService.upload(file, user)
    return this.configService.get<string>('CDN_BASE_PATH') + fileName
  }

    async createSection(body: UploadSectionDto, files: MinimalFile[], user: JwtUser) {
      const section = new Section()
      section.type = body.type
      section.sectionTitle = body.section_title
      section.sectionDescription = body.section_description
      section.purchasable = Boolean(body.purchasable)
      section.yIndex = 1
      const insertedSection = await this.sectionRepository.save(section)
      if(body.preview_amount) {
        const previewAmount = new PreviewAmount()
        previewAmount.amount = body.preview_amount
        previewAmount.sectionId = insertedSection.sectionId
        section.previewAmount = previewAmount
        await this.previewAmountRepository.save(previewAmount)
      }
      if(files.length) {
        const sectionPictures: BigSectionPicture[] = []
        for(const file of files){
          const fileName = await this.storageService.upload(file, user)
          const sectionPicture = new BigSectionPicture()
          sectionPicture.picture = fileName
          sectionPicture.sectionId = insertedSection.sectionId
          sectionPictures.push(sectionPicture)
        }
        await this.bigSectionPictureRepository.save(sectionPictures)
      }
    }
}
