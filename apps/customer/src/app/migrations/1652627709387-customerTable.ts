import {MigrationInterface, QueryRunner} from "typeorm";

export class customerTable1652627709387 implements MigrationInterface {
    name = 'customerTable1652627709387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oauth_sub" character varying NOT NULL, "lastname" character varying NOT NULL, "firstname" character varying NOT NULL, "email" character varying NOT NULL, "profile_pic" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b3e6e6d400341aa717aa8fea6f2" UNIQUE ("oauth_sub", "email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
