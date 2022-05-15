import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({name: 'provider_account'})
export class ProviderAccount {
    @PrimaryColumn({name: 'id_provider'})
    idProvider: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
