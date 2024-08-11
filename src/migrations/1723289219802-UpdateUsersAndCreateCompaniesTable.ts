import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersAndCreateCompaniesTable1653661244318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "companies" (
        "id" SERIAL PRIMARY KEY,
        "company_name" VARCHAR(255) NOT NULL,
        "cnpj" VARCHAR(20) NOT NULL,
        "endereco" VARCHAR(255) NOT NULL,
        "telefone" VARCHAR(20) NOT NULL
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "name" VARCHAR(255),
      ADD COLUMN "company_id" INT,
      ADD CONSTRAINT "FK_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP CONSTRAINT "FK_company_id",
      DROP COLUMN "company_id",
      DROP COLUMN "name";
    `);

    await queryRunner.query(`
      DROP TABLE "companies";
    `);
  }
}
