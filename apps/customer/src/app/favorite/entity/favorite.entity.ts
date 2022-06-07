import {
    Entity, JoinColumn, ManyToOne,
    PrimaryColumn,

} from "typeorm";
import {Customer} from "../../auth/entity/customer.entity";

@Entity()
export class Favorite {
    @PrimaryColumn({name: 'id_provider'})
    idProvider: string;

    @PrimaryColumn({name: 'id_customer'})
    @ManyToOne(()=>Customer, customer => customer.favorites)
    @JoinColumn({name: 'id_customer'})
    idCustomer: string;

}
