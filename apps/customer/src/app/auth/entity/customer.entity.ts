import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import {Project} from "../../project/entity/project.entity";
import {Favorite} from "../../favorite/entity/favorite.entity";

@Entity()
@Unique(['oauthSub', 'email'])
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'oauth_sub'})
    oauthSub: string

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    email: string;

    @Column({name: 'profile_pic'})
    profilePicture: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Project, project => project.customer)
    projects: Project[];

    @OneToMany(() => Favorite, favorite => favorite.idCustomer)
    favorites: Favorite[];
}
