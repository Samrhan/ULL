import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Matches} from "class-validator";
import {PASSWORD_REGEX} from "@ull/global-constants";

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public old_password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX)
  public new_password: string;
}
