import {Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Category} from "../../category/entity/category.entity";
import {Tag} from "../../tag/entity/tag.entity";
import {Review} from "../../review/entity/review.entity";

@Entity()
export class Provider {
    @PrimaryColumn('uuid', {name: 'id_provider'})
    idProvider: string

    @ManyToOne(() => Category)
    @JoinColumn({name: 'category_name'})
    category: Category

    @ManyToMany(() => Tag)
    @JoinTable({name: 'provider_tags', joinColumn: {name: 'provider_id'}, inverseJoinColumn: {name: 'tag_name'}})
    tags: Tag[]

    @OneToMany(() => Review, (r) => r.provider)
    reviews: Review[]
}