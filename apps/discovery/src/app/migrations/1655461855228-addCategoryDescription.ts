import {MigrationInterface, QueryRunner} from "typeorm";

export class addCategoryDescription1655461855228 implements MigrationInterface {
    name = 'addCategoryDescription1655461855228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "section_description" TO "category_description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "category_description" TO "section_description"`);
    }

}
