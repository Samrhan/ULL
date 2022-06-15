import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTypo1655277839679 implements MigrationInterface {
    name = 'fixTypo1655277839679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "postal_coder" TO "postal_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "postal_code" TO "postal_coder"`);
    }

}
