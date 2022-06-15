import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column({name: 'postal_code'})
    postalCode: string;

    @Column({nullable: true})
    complement: string
}