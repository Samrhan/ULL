import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {PreviewAmount} from "./preview-amount.entity";
import {BigSectionPicture} from "./big-section-picture.entity";
import {TypeEnumEntity} from "./type-enum.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn('uuid', {name: 'section_id'})
    sectionId: string;

    @Column({name: 'type'})
    @ManyToOne(() => TypeEnumEntity)
    @JoinColumn({name: 'type'})
    type: string;

    @Column({name: 'y_index'})
    yIndex: number;

    @Column({name: 'section_title'})
    sectionTitle: string;

    @Column({name: 'section_description'})
    sectionDescription: string;

    @Column({name: 'purchasable'})
    purchasable: boolean;

    @OneToOne(() => PreviewAmount, (previewAmount) => previewAmount.sectionId)
    previewAmount?: PreviewAmount;

    @OneToMany(() => BigSectionPicture, (bigSectionPicture) => bigSectionPicture.sectionId)
    bigSectionPictures?: BigSectionPicture[];
}