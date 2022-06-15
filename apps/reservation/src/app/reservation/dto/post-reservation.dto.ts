import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class PostReservationDto {
    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    project_id: string;

    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty()
    performance_id: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}