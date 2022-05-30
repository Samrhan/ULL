import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {PreviewAmount} from "./preview-amount.entity";
import {BigSectionPicture} from "./big-section-picture.entity";
import {TypeEnumEntity} from "./type-enum.entity";
import {Provider} from "../../auth/entity/provider.entity";
import {PerformanceEntity} from "./performance.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn('uuid', {name: 'section_id'})
    sectionId: string;

    @Column({name: 'type'})
    @ManyToOne(() => TypeEnumEntity)
    @JoinColumn({name: 'type'})
    type: string;

    @ManyToOne(() => Provider, (provider) => provider.sections)
    @JoinColumn({name: 'provider_id'})
    provider: Provider;

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

    @OneToMany(()=>PerformanceEntity, (performance)=>performance.section)
    performances?: PerformanceEntity[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;
}