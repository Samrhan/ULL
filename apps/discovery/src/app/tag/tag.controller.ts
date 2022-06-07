import {Body, Controller, Get, Inject, Param, Put, UseGuards} from '@nestjs/common';
import {TagService} from "./tag.service";
import {JwtUser, UserType} from "@ull/api-interfaces";
import {LocalAuthGuard, User, UserGuard} from "@ull/auth";

@Controller('provider_tags')
@UseGuards(LocalAuthGuard)
export class TagController {
    @Inject() tagService: TagService;

    @Get()
    async getAllTags(): Promise<string[]> {
        return await this.tagService.getAllTags();
    }

    @Get(':id')
    async getProviderTags(@Param('id') providerId: string): Promise<string[]> {
        return await this.tagService.getProviderTags(providerId);
    }

    @Put()
    @UseGuards(UserGuard(UserType.PROVIDER))
    async editTags(@Body() tags: string[], @User() user: JwtUser) {
        return await this.tagService.editTags(tags, user);
    }
}
