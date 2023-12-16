import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from '../entities/device.entity';
import { RedisModule } from 'src/configs/redisModule';
import { MqttService } from 'src/MQTT/mqtt.service';
import { DeviceTypesEntity } from 'src/entities/deviceType.entity';
import { DeviceTypesRepository } from './deviceType.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity, DeviceTypesEntity]),
    RedisModule,
  ],
  controllers: [DeviceController],
  providers: [
    DeviceService,
    DeviceRepository,
    MqttService,
    DeviceTypesRepository,
  ],
})
export class DeviceModule {}
