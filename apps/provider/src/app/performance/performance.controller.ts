import {
    BadRequestException,
    Body,
    Controller, Delete, Get, Inject, Param,
    Post, Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePerformanceDto} from "./dto/create-performance.dto";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {LocalAuthGuard, User} from "@ull/auth";
import {PerformanceService} from "./performance.service";
import {PutPerformanceDto} from "./dto/put-performance.dto";

@Controller('performance')
@UseInterceptors(
    AnyFilesInterceptor(),
)
@UseGuards(LocalAuthGuard)
export class PerformanceController {
    @Inject() performanceService: PerformanceService;

    @Post()
    async createPerformance(@Body() performance: CreatePerformanceDto, @UploadedFiles() file: MinimalFile[], @User() user: JwtUser) {
        if(!file.length){
            throw new BadRequestException('Missing file')
        }

        await this.performanceService.createPerformance(performance, file[0], user)
    }

    @Put()
    async updatePerformance(@Body() performance: PutPerformanceDto, @UploadedFiles() file: MinimalFile[], @User() user: JwtUser) {
        await this.performanceService.update(performance, file[0], user)
    }

    @Delete(':id')
    async deletePerformance(@Param('id') performanceId: string, @User() user: JwtUser) {
        await this.performanceService.delete(performanceId, user)
    }

    @Get(':id')
    async getPerformance(@Param('id') performanceId: string) {
        return await this.performanceService.get(performanceId)
    }

}
