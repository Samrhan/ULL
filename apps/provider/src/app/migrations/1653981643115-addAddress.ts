import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress1653981643115 implements MigrationInterface {
    name = 'addAddress1653981643115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id_address" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "postal_coder" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`ALTER TABLE "provider" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "UQ_3e10fb8288d086608be8e6ff05c" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_3e10fb8288d086608be8e6ff05c" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_3e10fb8288d086608be8e6ff05c"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "UQ_3e10fb8288d086608be8e6ff05c"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP COLUMN "address_id"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
