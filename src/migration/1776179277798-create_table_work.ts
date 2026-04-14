import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWork1776179277798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    queryRunner.query(`
            CREATE TABLE public.work (
                id UUID PRIMARY KEY,

                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image VARCHAR(255) NOT NULL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner) {
    queryRunner.query(`DROP TABLE public.work`);
  }
}
