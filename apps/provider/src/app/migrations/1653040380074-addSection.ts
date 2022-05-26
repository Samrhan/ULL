import {MigrationInterface, QueryRunner} from "typeorm";

export class addSection1653040380074 implements MigrationInterface {
    name = 'addSection1653040380074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "preview_amount" ("id_section" uuid NOT NULL, "amount" integer NOT NULL, CONSTRAINT "REL_693c19e48b6b4d0f003874b486" UNIQUE ("id_section"), CONSTRAINT "PK_693c19e48b6b4d0f003874b486e" PRIMARY KEY ("id_section"))`);
        await queryRunner.query(`CREATE TABLE "type_enum" ("type" character varying NOT NULL, CONSTRAINT "PK_fdf1d8e7f57062665731e846ea0" PRIMARY KEY ("type"))`);
        await queryRunner.query(`CREATE TABLE "section" ("section_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "y_index" integer NOT NULL, "section_title" character varying NOT NULL, "section_description" character varying NOT NULL, "purchasable" boolean NOT NULL, CONSTRAINT "PK_64bb5bb8f6931759fee65510d8e" PRIMARY KEY ("section_id"))`);
        await queryRunner.query(`CREATE TABLE "big_section_picture" ("id_section" uuid NOT NULL, "picture" character varying NOT NULL, CONSTRAINT "PK_77eebfcda0e5f9a9a93cc2fda68" PRIMARY KEY ("id_section"))`);
        await queryRunner.query(`ALTER TABLE "preview_amount" ADD CONSTRAINT "FK_693c19e48b6b4d0f003874b486e" FOREIGN KEY ("id_section") REFERENCES "section"("section_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_8ec19e236052166507d1e1f26bb" FOREIGN KEY ("type") REFERENCES "type_enum"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "big_section_picture" ADD CONSTRAINT "FK_77eebfcda0e5f9a9a93cc2fda68" FOREIGN KEY ("id_section") REFERENCES "section"("section_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO type_enum (type) VALUES ('big'), ('medium'), ('small'), ('info')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "big_section_picture" DROP CONSTRAINT "FK_77eebfcda0e5f9a9a93cc2fda68"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_8ec19e236052166507d1e1f26bb"`);
        await queryRunner.query(`ALTER TABLE "preview_amount" DROP CONSTRAINT "FK_693c19e48b6b4d0f003874b486e"`);
        await queryRunner.query(`DROP TABLE "big_section_picture"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "type_enum"`);
        await queryRunner.query(`DROP TABLE "preview_amount"`);
    }

}
