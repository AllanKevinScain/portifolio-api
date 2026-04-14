import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProject1776175253678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    queryRunner.query(`
        CREATE TABLE public.project (
                id UUID PRIMARY KEY,

                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                repository VARCHAR(255) NOT NULL,
                demo VARCHAR(255) NOT NULL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
       `);
  }

  public async down(queryRunner: QueryRunner) {
    queryRunner.query(`rop table public.project`);
  }
}
