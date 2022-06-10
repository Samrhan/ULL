import {IsNotEmpty, IsUUID} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PutOrderProfileDto {
    @ApiProperty()
    @IsUUID("4")
    @IsNotEmpty()
    public id_section: string;

    @ApiProperty()
    @IsUUID("4",{each:true})
    @IsNotEmpty()
    public id_performances: string[];
}
