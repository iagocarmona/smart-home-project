import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableDevices1702606509778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'devices',
      new TableColumn({
        name: 'device_type_id',
        type: 'int',
        isNullable: false,
        default: 1,
      }),
    );

    await queryRunner.createForeignKey(
      'devices',
      new TableForeignKey({
        name: 'FK_device_type_id',
        columnNames: ['device_type_id'],
        referencedTableName: 'device_types',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('devices', 'device_type_id');
    await queryRunner.dropForeignKey('devices', 'FK_device_type_id');
  }
}
