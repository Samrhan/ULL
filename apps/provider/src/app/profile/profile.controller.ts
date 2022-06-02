import {
    Body,
    Controller,
    Delete, Get,
    Inject,
    Param, ParseArrayPipe,
    Post,
    Put, Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard, User} from "@ull/auth";
import {JwtUser, MinimalFile, ProviderCompanyInformation, SectionType} from "@ull/api-interfaces";
import {ProfileService} from "./profile.service";
import {UploadSectionDto} from "./dto/upload-section.dto";
import {PutSectionDto} from "./dto/put-section.dto";
import {PutOrderProfileDto} from "./dto/put-order-profile.dto";
import {UpdateProfileDto} from "./dto/put-profile.dto";

@Controller()
@UseInterceptors(
    AnyFilesInterceptor(),
)
@UseGuards(LocalAuthGuard)
export class ProfileController {
    @Inject() profileService: ProfileService

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

    @Delete("section/:id")
    async deleteSection(@Param('id') sectionId: string, @User() user: JwtUser) {
        await this.profileService.deleteSection(sectionId, user)
    }

    @Put("section")
    async putSection(@Body() body: PutSectionDto, @User() user: JwtUser) {
        await this.profileService.putSection(body, user)
    }

    @Post("section/:id_section/picture")
    async addPicture(@Param('id_section') sectionId: string, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.profileService.addPicture(sectionId, files, user)
    }

    @Delete("section/:id_section/picture/:id_picture")
    async deletePicture(@Param('id_section') sectionId: string, @Param('id_picture') pictureId: string, @User() user: JwtUser) {
        await this.profileService.deletePicture(sectionId, pictureId, user)
    }

    @Put("profile/order")
    async updateIndex(@Body(new ParseArrayPipe({items: PutOrderProfileDto})) profileOrder: PutOrderProfileDto[], @User() user: JwtUser) {
        await this.profileService.updateProfileOrder(profileOrder, user)
    }

    @Get('profile/:id')
    async getProfile(@Param('id') profileId: string) {
        return await this.profileService.getProfile(profileId)
    }

    @Put('profile')
    async updateProfile(@Body() updateProfile: UpdateProfileDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        return await this.profileService.updateProfile(updateProfile, files, user)
    }

    @Get('info')
    async getInfos(@User() user: JwtUser): Promise<ProviderCompanyInformation> {
        return await this.profileService.getInfo(user);
    }
}
