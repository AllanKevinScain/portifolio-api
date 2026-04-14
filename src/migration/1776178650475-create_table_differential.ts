import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDifferential1776178650475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    queryRunner.query(`
        CREATE TABLE public.differential (
                id UUID PRIMARY KEY,

                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner) {
    queryRunner.query(`DROP TABLE public.differential`);
  }
}
