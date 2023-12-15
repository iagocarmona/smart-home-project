import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDeviceTypes1702606051289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'device_types',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Lamp')`);
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Switch')`,
    );
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Sensor')`,
    );
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Camera')`,
    );
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Door')`);
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Window')`,
    );
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Lock')`);
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Alarm')`);
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Thermostat')`,
    );
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Speaker')`,
    );
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Vacuum')`,
    );
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Robot')`);
    await queryRunner.query(
      `INSERT INTO device_types (name) VALUES ('Display')`,
    );
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Alexa')`);
    await queryRunner.query(`INSERT INTO device_types (name) VALUES ('Other')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('device_types');
  }
}
