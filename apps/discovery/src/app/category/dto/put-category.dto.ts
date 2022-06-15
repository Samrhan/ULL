import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class PutCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    picture: string;
}
