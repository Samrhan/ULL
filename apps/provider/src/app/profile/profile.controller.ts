import {Body, Controller, Inject, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard, User} from "@ull/auth";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {ProfileService} from "./profile.service";

@Controller('profile')
@UseInterceptors(
  AnyFilesInterceptor(),
)
export class ProfileController {
  @Inject() profileService: ProfileService

  @UseGuards(LocalAuthGuard)
  @Post('section')
  async uploadSection(@Body() body: any, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser){
    return {image: await this.profileService.upload(files[0], user)}
  }
}
