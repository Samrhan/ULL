import {MigrationInterface, QueryRunner} from "typeorm";

export class addPerformances1653903251329 implements MigrationInterface {
    name = 'addPerformances1653903251329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "performance" ("id_performance" uuid NOT NULL DEFAULT uuid_generate_v4(), "performance_title" character varying NOT NULL, "performance_description" character varying NOT NULL, "performance_picture" character varying NOT NULL, "price_value" integer NOT NULL, "price_unit" integer NOT NULL, "y_index" integer, "deleted" boolean NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id_section" uuid, "id_provider" uuid NOT NULL, "id_performance_parent" uuid, CONSTRAINT "REL_665c2513692593f6d80932f2c5" UNIQUE ("id_performance_parent"), CONSTRAINT "PK_a9d5c9a2dbc247717fd72853e39" PRIMARY KEY ("id_performance"))`);
        await queryRunner.query(`ALTER TABLE "preview_amount" DROP CONSTRAINT "FK_693c19e48b6b4d0f003874b486e"`);
        await queryRunner.query(`ALTER TABLE "preview_amount" ADD CONSTRAINT "UQ_693c19e48b6b4d0f003874b486e" UNIQUE ("id_section")`);
        await queryRunner.query(`ALTER TABLE "preview_amount" ADD CONSTRAINT "FK_693c19e48b6b4d0f003874b486e" FOREIGN KEY ("id_section") REFERENCES "section"("section_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "performance" ADD CONSTRAINT "FK_aebebfb747d97153e7104946da7" FOREIGN KEY ("id_section") REFERENCES "section"("section_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "performance" ADD CONSTRAINT "FK_3bb9bd8a163c20946252fc2e543" FOREIGN KEY ("id_provider") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "performance" ADD CONSTRAINT "FK_665c2513692593f6d80932f2c5b" FOREIGN KEY ("id_performance_parent") REFERENCES "performance"("id_performance") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "performance" DROP CONSTRAINT "FK_665c2513692593f6d80932f2c5b"`);
        await queryRunner.query(`ALTER TABLE "performance" DROP CONSTRAINT "FK_3bb9bd8a163c20946252fc2e543"`);
        await queryRunner.query(`ALTER TABLE "performance" DROP CONSTRAINT "FK_aebebfb747d97153e7104946da7"`);
        await queryRunner.query(`ALTER TABLE "preview_amount" DROP CONSTRAINT "FK_693c19e48b6b4d0f003874b486e"`);
        await queryRunner.query(`ALTER TABLE "preview_amount" DROP CONSTRAINT "UQ_693c19e48b6b4d0f003874b486e"`);
        await queryRunner.query(`ALTER TABLE "preview_amount" ADD CONSTRAINT "FK_693c19e48b6b4d0f003874b486e" FOREIGN KEY ("id_section") REFERENCES "section"("section_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE "performance"`);
    }

}
