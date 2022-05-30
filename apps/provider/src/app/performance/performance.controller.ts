import {
    BadRequestException,
    Body,
    Controller, Inject,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePerformanceDto} from "./dto/create-performance.dto";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {LocalAuthGuard, User} from "@ull/auth";
import {PerformanceService} from "./performance.service";

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

        return await this.performanceService.createPerformance(performance, file[0], user)
    }

}
