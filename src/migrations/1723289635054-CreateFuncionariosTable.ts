import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFuncionariosTable1653661244319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "funcionarios" (
        "id" SERIAL PRIMARY KEY,
        "nome" VARCHAR(255) NOT NULL,
        "data_nascimento" DATE NOT NULL,
        "telefone" VARCHAR(20),
        "cpf" VARCHAR(14) NOT NULL UNIQUE,
        "estado_civil" VARCHAR(50),
        "cargo" VARCHAR(100),
        "formacao_academica" VARCHAR(255),
        "endereco" VARCHAR(255),
        "foto_path" VARCHAR(255),
        "company_id" INT,
        CONSTRAINT "FK_company_funcionarios" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "funcionarios";
    `);
  }
}
