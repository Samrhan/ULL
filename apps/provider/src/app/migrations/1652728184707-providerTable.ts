import {MigrationInterface, QueryRunner} from "typeorm";

export class providerTable1652728184707 implements MigrationInterface {
    name = 'providerTable1652728184707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying NOT NULL, "company_description" character varying NOT NULL, "siren" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "profile_picture" character varying NOT NULL, "cover_picture" character varying NOT NULL, "area_served" character varying NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "unique_provider" UNIQUE ("siren", "email", "phone_number"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "provider"`);
    }

}
