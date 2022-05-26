import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {Section} from "./section.entity";

@Entity()
export class PreviewAmount {
    @PrimaryColumn({name: 'id_section'})
    @OneToOne(() => Section, (s) => s.previewAmount, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'id_section'})
    sectionId: string;

    @Column()
    amount: number;
}