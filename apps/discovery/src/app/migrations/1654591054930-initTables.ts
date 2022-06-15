import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1654591054930 implements MigrationInterface {
    name = 'initTables1654591054930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("category_name" character varying NOT NULL, "popular" boolean NOT NULL, "category_picture" character varying NOT NULL, "section_description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9359e3b1d5e90d7a0fbe3b28077" PRIMARY KEY ("category_name"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("tag_name" character varying NOT NULL, CONSTRAINT "PK_c567d5f21442789d3fb85a53f07" PRIMARY KEY ("tag_name"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id_review" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_customer" character varying NOT NULL, "review_date" TIMESTAMP NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "provider_id" uuid, CONSTRAINT "PK_9e5845ef64f912a98908bb1aa0a" PRIMARY KEY ("id_review"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id_provider" uuid NOT NULL, "category_name" character varying, CONSTRAINT "PK_1479fc12a4b33f8605441d7b557" PRIMARY KEY ("id_provider"))`);
        await queryRunner.query(`CREATE TABLE "provider_tags" ("provider_id" uuid NOT NULL, "tag_name" character varying NOT NULL, CONSTRAINT "PK_a9fc9d746485733de09b2d62ad9" PRIMARY KEY ("provider_id", "tag_name"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6883414a100535cd2dd785f67" ON "provider_tags" ("provider_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aae15c7eeee14e087a87c045f9" ON "provider_tags" ("tag_name") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_273a18d8a4d99064611631c1366" FOREIGN KEY ("provider_id") REFERENCES "provider"("id_provider") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_0342d0eabb5ae866becbf46b14a" FOREIGN KEY ("category_name") REFERENCES "category"("category_name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_tags" ADD CONSTRAINT "FK_f6883414a100535cd2dd785f674" FOREIGN KEY ("provider_id") REFERENCES "provider"("id_provider") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_tags" ADD CONSTRAINT "FK_aae15c7eeee14e087a87c045f95" FOREIGN KEY ("tag_name") REFERENCES "tag"("tag_name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_tags" DROP CONSTRAINT "FK_aae15c7eeee14e087a87c045f95"`);
        await queryRunner.query(`ALTER TABLE "provider_tags" DROP CONSTRAINT "FK_f6883414a100535cd2dd785f674"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_0342d0eabb5ae866becbf46b14a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_273a18d8a4d99064611631c1366"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aae15c7eeee14e087a87c045f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6883414a100535cd2dd785f67"`);
        await queryRunner.query(`DROP TABLE "provider_tags"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
