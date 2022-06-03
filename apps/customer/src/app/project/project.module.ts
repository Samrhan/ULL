import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Customer} from "../auth/entity/customer.entity";
import {Project} from "./entity/project.entity";
import {Favorite} from "../favorite/entity/favorite.entity";
import {ProjectStateEntity} from "./entity/project-state.entity";
import {Address} from "./entity/address.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Project, Favorite, ProjectStateEntity, Address])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {
}
