import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "./address.entity";
import {Customer} from "../../auth/entity/customer.entity";
import {ProjectStateEntity} from "./project-state.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid", {name: 'id_project'})
    idProject: string;

    @Column()
    name: string;

    @Column({type: 'timestamp without time zone', name: 'project_date'})
    projectDate: string;

    @Column({name: 'project_state'})
    @ManyToOne(() => ProjectStateEntity)
    @JoinColumn({name: 'project_state'})
    projectState: string;

    @Column()
    description: string;

    @Column({nullable: true})
    image: string;

    @Column({name: 'amount_of_people'})
    amountOfPeople: number

    @OneToOne(() => Address)
    @JoinColumn({name: 'id_address'})
    address: Address

    @ManyToOne(() => Customer, customer => customer.projects)
    @JoinColumn({name: 'id_customer'})
    customer: Customer
}