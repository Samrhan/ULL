import {MigrationInterface, QueryRunner} from "typeorm";

export class addJtiColumn1652725694935 implements MigrationInterface {
    name = 'addJtiColumn1652725694935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" ADD "jti" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_account" DROP COLUMN "jti"`);
    }

}
