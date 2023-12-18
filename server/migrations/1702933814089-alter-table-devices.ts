import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableDevices1702933814089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'devices',
      new TableColumn({
        name: 'topic',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('devices', 'topic');
  }
}
