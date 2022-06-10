import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateProjectDto} from "./dto/create-project.dto";
import {LocalAuthGuard, User, UserGuard} from "@ull/auth";
import {JwtUser, MinimalFile, Project as IProject} from "@ull/api-interfaces";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {ProjectService} from "./project.service";
import {EditProjectDto} from "./dto/edit-project.entity";

@Controller('project')
@UseGuards(LocalAuthGuard)
@UseInterceptors(
    AnyFilesInterceptor()
)
export class ProjectController {
    @Inject() projectService: ProjectService

    @Post()
    @UseGuards(UserGuard('customer'))
    async createProject(@Body() body: CreateProjectDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.projectService.createProject(body, files[0], user)
    }

    @Put()
    @UseGuards(UserGuard('customer'))
    async editProject(@Body() body: EditProjectDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.projectService.editProject(body, files[0], user)
    }

    @Delete(':id')
    @UseGuards(UserGuard('customer'))
    async deleteProject(@Param('id') projectId: string, @User() user: JwtUser) {
        await this.projectService.deleteProject(projectId, user)
    }

    @Get(':id')
    async getProjectDetail(@Param('id') projectId: string): Promise<IProject>{
        return await this.projectService.getProjectDetail(projectId)
    }
}
