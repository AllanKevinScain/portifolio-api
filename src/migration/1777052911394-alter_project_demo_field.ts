import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProjectDemoField1777052911394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE project
        ALTER COLUMN demo DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
