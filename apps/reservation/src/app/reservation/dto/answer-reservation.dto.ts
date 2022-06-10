import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsUUID} from "class-validator";

export class AnswerReservationDto {
    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    performance_id: string;

    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    project_id: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    accepted: boolean;
}
