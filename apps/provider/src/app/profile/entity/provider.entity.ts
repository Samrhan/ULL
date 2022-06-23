import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import {Section} from "./section.entity";
import {PerformanceEntity} from "../../performance/entity/performance.entity";
import {Address} from "./address.entity";

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

    @Column({name: 'profile_picture', nullable: true})
    profilePicture?: string

    @Column({name: 'cover_picture', nullable: true})
    coverPicture?: string;

    @Column({name: 'area_served'})
    areaServed: string;

    @OneToOne(() => Address)
    @JoinColumn({name: 'address_id'})
    address: Address

    @Column({default: false})
    deleted: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({name: 'deleted_at', type: 'timestamp without time zone', nullable: true})
    deletedAt?: string;

    @OneToMany(() => Section, section => section.provider)
    sections: Section[];

    @OneToMany(() => PerformanceEntity, performance => performance.provider)
    performances: PerformanceEntity[];
}
