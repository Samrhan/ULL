import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserId1655458584925 implements MigrationInterface {
    name = 'addUserId1655458584925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "customer_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "customer_id"`);
    }

}
