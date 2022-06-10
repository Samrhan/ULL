import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Provider} from "../../shared/entity/provider.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid', {name: 'id_review'})
    idReview: string

    @Column({name: 'id_customer'})
    idCustomer: string;

    @Column({name: 'review_date', type: 'timestamp without time zone'})
    reviewDate: string;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @ManyToOne(() => Provider, (p) => p.reviews)
    @JoinColumn({name: 'provider_id'})
    provider: Provider
}