import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Section} from "./section.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id_address: string;

    @Column()
    number: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column({name: 'postal_coder'})
    postalCode: string;

    @Column({nullable: true})
    complement: string
}