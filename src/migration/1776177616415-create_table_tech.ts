import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTech1776177616415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(`
            CREATE TABLE tech (
                id UUID PRIMARY KEY,

                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                nivel VARCHAR(20) NOT NULL CHECK (
                    nivel IN ('junior', 'mid', 'senior', 'stack')
                ),

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(`DROP TABLE tech`);
  }
}
