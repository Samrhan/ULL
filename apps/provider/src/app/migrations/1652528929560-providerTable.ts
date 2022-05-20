import {MigrationInterface, QueryRunner} from "typeorm";

export class providerTable1652528929560 implements MigrationInterface {
  name = 'providerTable1652528929560'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "provider"
                             (
                               "id"                  uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "company_name"        character varying NOT NULL,
                               "company_description" character varying NOT NULL,
                               "siren"               character varying NOT NULL,
                               "email"               character varying NOT NULL,
                               "phone_number"        character varying NOT NULL,
                               "profile_picture"     character varying NOT NULL,
                               "cover_picture"       character varying NOT NULL,
                               "area_served"         character varying NOT NULL,
                               "deleted"             boolean           NOT NULL DEFAULT false,
                               "deletion_date"       TIMESTAMP WITH TIME ZONE,
                               CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "provider"
      ADD CONSTRAINT "unique_provider" UNIQUE ("siren", "email", "phone_number")`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "provider"`);
  }

}
