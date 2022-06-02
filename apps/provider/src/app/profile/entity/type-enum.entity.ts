import {Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'type_enum'})
export class TypeEnumEntity {
    @PrimaryColumn()
    type: string;
}