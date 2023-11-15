import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'smarthome',
  ssl: false,
  synchronize: true,
  logging: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../../migrations/*.ts'],
});
