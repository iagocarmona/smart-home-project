import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from '../entities/device.entity';
import { RedisModule } from 'src/configs/redisModule';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity]), RedisModule],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
