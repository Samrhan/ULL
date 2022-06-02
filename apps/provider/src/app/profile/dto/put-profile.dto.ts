import {IsEmail, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsString, ValidateNested} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProfileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public company_name?: string;

    @ApiProperty({nullable: true})
    @IsString()
    @IsNotEmpty()
    public company_description?: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email?: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber({region: 'FR'} as never)
    @IsNotEmpty()
    public phone?: string;

    @ApiProperty({nullable: true})
    @IsString()
    @IsNotEmpty()
    public area_served?: string

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