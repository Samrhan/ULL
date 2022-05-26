import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Section} from "./section.entity";

@Entity()
export class BigSectionPicture {
    @ManyToOne(() => Section, (section) => section.bigSectionPictures, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'id_section'})
    sectionId: string;

    @PrimaryColumn()
    picture: string;
}