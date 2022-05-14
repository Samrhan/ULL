import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

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

  @Column({name: 'deletion_date', type: 'timestamp with time zone', nullable: true})
  deletionDate?: string;
}
