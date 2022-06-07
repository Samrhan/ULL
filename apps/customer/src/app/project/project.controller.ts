import {Body, Controller, Get, Inject, Param, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateProjectDto} from "./dto/create-project.dto";
import {LocalAuthGuard, User} from "@ull/auth";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {ProjectService} from "./project.service";

@Controller('project')
@UseGuards(LocalAuthGuard)
@UseInterceptors(
    AnyFilesInterceptor()
)
export class ProjectController {
    @Inject() projectService: ProjectService

    @Post()
    async createProject(@Body() body: CreateProjectDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.projectService.createProject(body, files[0], user)
    }

    @Get(':id')
    async getProjectDetail(@Param('id') projectId: string){
        await this.projectService.getProjectDetail(projectId)
    }
}
