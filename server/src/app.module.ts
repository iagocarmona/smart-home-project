import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './devices/device.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'smarthome',
      entities: [],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'smarthome',
    }),
    RedisModule.register({
      host: 'localhost',
      port: 6379,
    }),
    DeviceModule,
  ],
})
export class AppModule {}
