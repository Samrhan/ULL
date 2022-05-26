import {
    IsBoolean, IsBooleanString, IsEnum,
    IsNotEmpty, IsNumber, IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {SectionType} from "@ull/api-interfaces";


export class UploadSectionDto {
    @ApiProperty()
    @IsEnum(SectionType)
    @IsNotEmpty()
    public type: SectionType;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    public y_index: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public section_title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public section_description: string;

    @ApiProperty()
    @IsBooleanString()
    @IsNotEmpty()
    public purchasable: string;

    @ApiProperty()
    @IsNumberString()
    @IsOptional()
    public preview_amount: number;
}
