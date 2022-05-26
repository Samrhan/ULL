import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Section} from "./section.entity";

@Entity()
export class BigSectionPicture {
    @PrimaryColumn({name: 'id_section'})
    @ManyToOne(() => Section, (section) => section.bigSectionPictures)
    @JoinColumn({name: 'id_section'})
    sectionId: string;

    @Column()
    picture: string;
}