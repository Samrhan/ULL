import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class PutSectionDto {
    @ApiProperty()
    @IsUUID("4")
    @IsNotEmpty()
    public id_section: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public section_title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public section_description: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    public purchasable: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    public preview_amount?: number;
}
