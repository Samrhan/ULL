import {Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'project_state'})
export class ProjectStateEntity {
    @PrimaryColumn({name: 'project_state'})
    projectState: string;
}