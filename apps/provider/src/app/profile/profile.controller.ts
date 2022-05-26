import {Body, Controller, Inject, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard, User} from "@ull/auth";
import {JwtUser, MinimalFile, SectionType} from "@ull/api-interfaces";
import {ProfileService} from "./profile.service";
import {UploadSectionDto} from "./dto/upload-section.dto";

@Controller()
@UseInterceptors(
    AnyFilesInterceptor(),
)
export class ProfileController {
    @Inject() profileService: ProfileService

    @UseGuards(LocalAuthGuard)
    @Post('section')
    async uploadSection(@Body() body: UploadSectionDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        switch (body.type) {
            case SectionType.BIG:
                if (body.preview_amount) {
                    body.preview_amount = undefined;
                }
                break;
            case SectionType.SMALL:
                if (files.length) {
                    files = []
                }
                break;
            default:
                if (body.preview_amount) {
                    body.preview_amount = undefined;
                }
                if (files.length) {
                    files = []
                }
                break;
        }

        await this.profileService.createSection(body, files, user)
    }
}
