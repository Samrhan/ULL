import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNullableColumns1655453072602 implements MigrationInterface {
    name = 'updateNullableColumns1655453072602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" ALTER COLUMN "profile_picture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider" ALTER COLUMN "cover_picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" ALTER COLUMN "cover_picture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider" ALTER COLUMN "profile_picture" SET NOT NULL`);
    }

}
