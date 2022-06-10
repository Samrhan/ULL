import {Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'reservation_state'})
export class ReservationStateEntity{
    @PrimaryColumn()
    state: string;
}