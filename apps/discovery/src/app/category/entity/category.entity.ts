import {
    Column,
    CreateDateColumn,
    Entity, PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({name: 'category_name'})
    categoryName: string;

    @Column()
    popular: boolean;

    @Column({name: 'category_picture'})
    categoryPicture: string;

    @Column({name: 'category_description'})
    categoryDescription: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;
}