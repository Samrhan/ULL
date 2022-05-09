import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({name: 'provider_account'})
export abstract class ProviderAccount {
    @PrimaryColumn({name: 'id_provider'})
    idProvider: string;

    @Column()
    password: string;
}