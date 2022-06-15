import {IsEnum, IsNotEmpty, IsNumberString, IsString, IsUUID,} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {PriceUnit} from "@ull/api-interfaces";


export class CreatePerformanceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public performance_title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public performance_description: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    public price_value: number;

    @ApiProperty()
    @IsEnum(PriceUnit)
    @IsNotEmpty()
    public price_unit: PriceUnit;

    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    public id_section: string;
}
