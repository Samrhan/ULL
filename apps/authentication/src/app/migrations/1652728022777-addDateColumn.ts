import {MigrationInterface, QueryRunner} from "typeorm";

export class addDateColumn1652728022777 implements MigrationInterface {
    name = 'addDateColumn1652728022777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "provider_account" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "provider_account" DROP COLUMN "created_at"`);
    }

}
