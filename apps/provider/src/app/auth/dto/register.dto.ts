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


export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public company_name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX)
  public password: string;

  @IsString()
  @IsOptional()
  public company_description: string;

  @IsNumberString()
  @Length(9,9)
  @IsNotEmpty()
  public siren: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsPhoneNumber({region: 'FR'} as never)
  @IsNotEmpty()
  public phone_number: string;

  @IsString()
  @IsOptional()
  public profile_picture: string;


  @IsString()
  @IsOptional()
  public cover_picture: string;

  @IsString()
  @IsOptional()
  public area_served: string
}
