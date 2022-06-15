import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    Matches
} from 'class-validator';
import {PASSWORD_REGEX} from '@ull/global-constants';
import {ApiProperty} from "@nestjs/swagger";


export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public company_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX)
  public password: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  public company_description?: string;

  @ApiProperty()
  @IsNumberString()
  @Length(9, 9)
  @IsNotEmpty()
  public siren: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber({region: 'FR'} as never)
  @IsNotEmpty()
  public phone: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  public profile_picture?: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  public cover_picture?: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  public area_served?: string
}
