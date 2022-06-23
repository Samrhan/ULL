import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {ReservationStateEntity} from "./reservation-state.entity";

@Entity()
export class Reservation {
    @PrimaryColumn('uuid', {name: 'id_performance'})
    idPerformance: string;

    @PrimaryColumn("uuid", {name: 'id_project'})
    idProject: string;

    @Column()
    quantity: number;

    @ManyToOne(() => ReservationStateEntity)
    @JoinColumn({name: 'state'})
    state: string

    @Column({name: 'replacement_round', default: 0})
    replacementRound: number;

    @Column({name: 'project_date', type: 'timestamp without time zone'})
    projectDate: string;

    @Column({name: 'provider_id'})
    providerId: string

    @Column({name: 'customer_id'})
    customerId: string

    @Column({name: 'added_date', type: 'timestamp without time zone'})
    addedDate: string;

    @Column({name: 'locked_date', type: 'timestamp without time zone', nullable: true})
    lockedDate: string;

    @Column({name: 'answer_date', type: 'timestamp without time zone', nullable: true})
    answerDate: string;

    @Column({name: 'pay_date', type: 'timestamp without time zone', nullable: true})
    payDate: string;

    @Column({name: 'cancel_date', type: 'timestamp without time zone', nullable: true})
    cancelDate: string;

    @OneToOne(() => Reservation, {nullable: true})
    @JoinColumn([{
        name: 'id_performance_replaced',
        referencedColumnName: 'idPerformance'
    }, {name: 'id_project_replaced', referencedColumnName: 'idProject'}])
    reservationReplace?: Reservation;

}
