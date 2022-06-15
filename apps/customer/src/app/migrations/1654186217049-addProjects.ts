import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjects1654186217049 implements MigrationInterface {
    name = 'addProjects1654186217049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id_address" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id_provider" character varying NOT NULL, "id_customer" uuid NOT NULL, CONSTRAINT "PK_837fc77dd5391a921022578143a" PRIMARY KEY ("id_provider", "id_customer"))`);
        await queryRunner.query(`CREATE TABLE "project_state" ("project_state" character varying NOT NULL, CONSTRAINT "PK_a747e5a7d0f6f7ff84890b83211" PRIMARY KEY ("project_state"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id_project" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "project_date" TIMESTAMP NOT NULL, "project_state" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "amount_of_people" integer NOT NULL, "id_address" uuid, "id_customer" uuid, CONSTRAINT "REL_1667c1422b53dcbafdbec4e8c9" UNIQUE ("id_address"), CONSTRAINT "PK_c0f9a9aa2e8e83fa51f94635386" PRIMARY KEY ("id_project"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_a8a42331ec78e7f4a27b546c048" FOREIGN KEY ("id_customer") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_c601730ecdf05e1ae9cac222c4b" FOREIGN KEY ("project_state") REFERENCES "project_state"("project_state") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1667c1422b53dcbafdbec4e8c98" FOREIGN KEY ("id_address") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_8427cdd00ac82142d7b23c69973" FOREIGN KEY ("id_customer") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "project_state"("project_state") VALUES ('draft'),('pending_validation'),('replacement'),('pending_payment'),('paid')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_8427cdd00ac82142d7b23c69973"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1667c1422b53dcbafdbec4e8c98"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_c601730ecdf05e1ae9cac222c4b"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_a8a42331ec78e7f4a27b546c048"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_state"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
