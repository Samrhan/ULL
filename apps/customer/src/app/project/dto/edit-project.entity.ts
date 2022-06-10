import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    IsUUID
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class EditProjectDto {
    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    public project_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public project_name: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    public project_date: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public project_description: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    public amount_of_people: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public address_number: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public address_street: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public address_city: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public address_postal_code: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    public address_complement?: string
}
