import {Inject, Injectable} from '@nestjs/common';
import {StorageService} from "@ull/storage";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ProfileService {
  @Inject() storageService: StorageService;
  @Inject() configService: ConfigService;

  async upload(file: MinimalFile, user: JwtUser) {
    const fileName = await this.storageService.upload(file, user)
    return this.configService.get<string>('CDN_BASE_PATH') + fileName
  }
}
