import {MigrationInterface, QueryRunner} from "typeorm";

export class addChangePasswordToken1652862426663 implements MigrationInterface {
    name = 'addChangePasswordToken1652862426663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" ADD "reset_password_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" DROP COLUMN "reset_password_token"`);
    }

}
