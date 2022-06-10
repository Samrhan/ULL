import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1654597663458 implements MigrationInterface {
    name = 'initTables1654597663458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation_state" ("state" character varying NOT NULL, CONSTRAINT "PK_4aa12a0cdd7504d90596147b755" PRIMARY KEY ("state"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id_performance" uuid NOT NULL, "id_project" uuid NOT NULL, "quantity" integer NOT NULL, "replacement_round" integer NOT NULL DEFAULT '0', "added_date" TIMESTAMP NOT NULL, "locked_date" TIMESTAMP, "answer_date" TIMESTAMP, "pay_date" TIMESTAMP, "cancel_date" TIMESTAMP, "state" character varying, "id_performance_replaced" uuid, "id_project_replaced" uuid, CONSTRAINT "REL_d4e50014183453d794b8e14acd" UNIQUE ("id_performance_replaced", "id_project_replaced"), CONSTRAINT "PK_c111d485f639efada0b997c04d8" PRIMARY KEY ("id_performance", "id_project"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_adeaeaa455a17f42fa47d96df59" FOREIGN KEY ("state") REFERENCES "reservation_state"("state") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_d4e50014183453d794b8e14acd8" FOREIGN KEY ("id_performance_replaced", "id_project_replaced") REFERENCES "reservation"("id_performance","id_project") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "reservation_state"
                                 VALUES ('added'),
                                        ('pending'),
                                        ('accepted'),
                                        ('rejected'),
                                        ('paid'),
                                        ('customer_cancelled'),
                                        ('provider_cancelled')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_d4e50014183453d794b8e14acd8"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_adeaeaa455a17f42fa47d96df59"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "reservation_state"`);
    }

}
