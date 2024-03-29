import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseArrayPipe,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard, User, UserGuard} from "@ull/auth";
import {JwtUser, MinimalFile, ProviderCompanyInformation, SectionType, UserType} from "@ull/api-interfaces";
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
    @UseGuards(UserGuard(UserType.PROVIDER))
    async uploadSection(@Body() body: UploadSectionDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        if (body.type !== SectionType.small) {
            body.preview_amount = undefined;
        }

        if (body.type !== SectionType.big) {
            files = []
        }

        await this.profileService.createSection(body, files, user)
    }

    @Delete("section/:id")
    @UseGuards(UserGuard(UserType.PROVIDER))

    async deleteSection(@Param('id') sectionId: string, @User() user: JwtUser) {
        await this.profileService.deleteSection(sectionId, user)
    }

    @Put("section")
    @UseGuards(UserGuard(UserType.PROVIDER))
    async putSection(@Body() body: PutSectionDto, @User() user: JwtUser) {
        await this.profileService.putSection(body, user)
    }

    @Post("section/:id_section/picture")
    @UseGuards(UserGuard(UserType.PROVIDER))
    async addPicture(@Param('id_section') sectionId: string, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.profileService.addPicture(sectionId, files, user)
    }

    @Delete("section/:id_section/picture/:id_picture")
    @UseGuards(UserGuard(UserType.PROVIDER))
    async deletePicture(@Param('id_section') sectionId: string, @Param('id_picture') pictureId: string, @User() user: JwtUser) {
        await this.profileService.deletePicture(sectionId, pictureId, user)
    }

    @Put("profile/order")
    @UseGuards(UserGuard(UserType.PROVIDER))
    async updateIndex(@Body(new ParseArrayPipe({items: PutOrderProfileDto})) profileOrder: PutOrderProfileDto[], @User() user: JwtUser) {
        await this.profileService.updateProfileOrder(profileOrder, user)
    }

    @Get('profile/:id')
    async getProfile(@Param('id') profileId: string) {
        return await this.profileService.getProfile(profileId)
    }

    @Put('profile')
    @UseGuards(UserGuard(UserType.PROVIDER))
    async updateProfile(@Body() updateProfile: UpdateProfileDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        return await this.profileService.updateProfile(updateProfile, files, user)
    }

    @Get('info')
    async getInfos(@User() user: JwtUser): Promise<ProviderCompanyInformation> {
        return await this.profileService.getInfo(user);
    }
}
