import {MigrationInterface, QueryRunner} from "typeorm";

export class updateReservationsTable1654691873459 implements MigrationInterface {
    name = 'updateReservationsTable1654691873459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "project_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "provider_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "project_date"`);
    }

}
