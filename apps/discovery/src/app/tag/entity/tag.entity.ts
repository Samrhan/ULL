import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Tag {
    @PrimaryColumn({name: 'tag_name'})
    tagName: string;
}