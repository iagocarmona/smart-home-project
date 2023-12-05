import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './devices/device.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceEntity } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'smarthome',
      entities: [DeviceEntity],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'smarthome',
    }),
    DeviceModule,
  ],
})
export class AppModule {}
