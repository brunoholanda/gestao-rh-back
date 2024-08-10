import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFuncHistoryTable1653661244320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "func_history" (
        "id" SERIAL PRIMARY KEY,
        "funcionario_id" INT NOT NULL,
        "history_name" VARCHAR(255) NOT NULL,
        "history_date" DATE NOT NULL,
        "history_describes" TEXT,
        "history_files" VARCHAR(255),
        CONSTRAINT "FK_funcionario_history" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "func_history";
    `);
  }
}
