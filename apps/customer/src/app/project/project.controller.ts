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

@Controller('')
@UseGuards(LocalAuthGuard)
@UseInterceptors(
    AnyFilesInterceptor()
)
export class ProjectController {
    @Inject() projectService: ProjectService

    @Post('project')
    @UseGuards(UserGuard('customer'))
    async createProject(@Body() body: CreateProjectDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.projectService.createProject(body, files[0], user)
    }

    @Post('confirm/:id')
    @UseGuards(UserGuard('customer'))
    async confirmProject(@Param('id') id: string, @User() user: JwtUser) {
        await this.projectService.confirmProject(id, user)
    }

    @Put('project')
    @UseGuards(UserGuard('customer'))
    async editProject(@Body() body: EditProjectDto, @UploadedFiles() files: MinimalFile[], @User() user: JwtUser) {
        await this.projectService.editProject(body, files[0], user)
    }

    @Delete('project/:id')
    @UseGuards(UserGuard('customer'))
    async deleteProject(@Param('id') projectId: string, @User() user: JwtUser) {
        await this.projectService.deleteProject(projectId, user)
    }

    @Get('project/:id')
    async getProjectDetail(@Param('id') projectId: string): Promise<IProject>{
        return await this.projectService.getProjectDetail(projectId)
    }

    @Get('all_projects')
    async getAllProjects(@User() user: JwtUser){
        return await this.projectService.getAllProjects(user)
    }
}
