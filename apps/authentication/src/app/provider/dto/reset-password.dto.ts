import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsUUID, Matches} from "class-validator";
import {PASSWORD_REGEX} from "@ull/global-constants";

export class ResetPasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(PASSWORD_REGEX)
    public new_password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    public token: string;
}
