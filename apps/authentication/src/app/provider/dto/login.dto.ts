import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public password: string;
}
