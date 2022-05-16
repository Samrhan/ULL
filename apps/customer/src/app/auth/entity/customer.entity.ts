import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

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
  updated_at: Date;


}
