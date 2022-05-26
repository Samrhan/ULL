import {
    Body,
    Controller,
    Delete,
    Inject,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard, User} from "@ull/auth";
import {JwtUser, MinimalFile, SectionType} from "@ull/api-interfaces";
import {ProfileService} from "./profile.service";
import {UploadSectionDto} from "./dto/upload-section.dto";
import {PutSectionDto} from "./dto/put-section.dto";

@Controller()
@UseInterceptors(
    AnyFilesInterceptor(),
)
export class ProfileController {
    @Inject() profileService: ProfileService

    @UseGuards(LocalAuthGuard)
    @Post('section')
    async uploadSection(@Body() body: UploadSectionDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        if (body.type !== SectionType.SMALL) {
            body.preview_amount = undefined;
        }

        if (body.type !== SectionType.BIG) {
            files = []
        }

        await this.profileService.createSection(body, files, user)
    }

    @UseGuards(LocalAuthGuard)
    @Delete("section/:id")
    async deleteSection(@Param('id') sectionId: string, @User() user: JwtUser) {
        await this.profileService.deleteSection(sectionId, user)
    }

    @UseGuards(LocalAuthGuard)
    @Put("section")
    async putSection(@Body() body: PutSectionDto, @User() user: JwtUser) {
        await this.profileService.putSection(body, user)
    }

    @UseGuards(LocalAuthGuard)
    @Post("section/:id_section/picture")
    async addPicture(@Param('id_section') sectionId: string, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.profileService.addPicture(sectionId, files, user)
    }

    @UseGuards(LocalAuthGuard)
    @Delete("section/:id_section/picture/:id_picture")
    async deletePicture(@Param('id_section') sectionId: string, @Param('id_picture') pictureId: string, @User() user: JwtUser) {
        await this.profileService.deletePicture(sectionId, pictureId, user)
    }

    @UseGuards(LocalAuthGuard)
    @Post("section/updateIndex")
    async updateIndex(@Body() sectionId: string[], @User() user: JwtUser) {
        await this.profileService.updateIndex(sectionId, user)
    }
}
