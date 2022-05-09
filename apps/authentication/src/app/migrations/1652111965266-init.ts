import {MigrationInterface, QueryRunner} from "typeorm";

export class init1652111965266 implements MigrationInterface {
    name = 'init1652111965266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider_account" ("id_provider" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_753fe06d82a87f446227a928900" PRIMARY KEY ("id_provider"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "provider_account"`);
    }

}
