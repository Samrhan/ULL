import {Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'provider_account'})
export class ProviderAccount {
  @PrimaryColumn({name: 'id_provider'})
  idProvider: string;

  @Column()
  @Generated("uuid")
  jti: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
