import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';

@Entity()
@Unique('unique_provider', ['siren', 'email', 'phoneNumber'])
export class Provider {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'company_name'})
  companyName: string;

  @Column({name: 'company_description'})
  companyDescription: string;

  @Column()
  siren: string;

  @Column()
  email: string

  @Column({name: 'phone_number'})
  phoneNumber: string

  @Column({name:'profile_picture'})
  profilePicture: string

  @Column({name: 'cover_picture'})
  coverPicture: string;

  @Column({name: 'area_served'})
  areaServed: string;

  @Column({default: false})
  deleted: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Column({name: 'deleted_at', type: 'timestamp with time zone', nullable: true})
  deletedAt?: string;
}
