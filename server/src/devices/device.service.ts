import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceCreateDTO, DeviceUpdateDTO, IDeviceMongo } from './device.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BaseRedisKeys } from 'src/helpers/redis';
import { MqttService } from 'src/MQTT/mqtt.service';
import { PubMQTTDTO } from 'src/DTOs/pubMQTT.dto';
import { DeviceTypesEntity } from 'src/entities/deviceType.entity';
import { DeviceTypesRepository } from './deviceType.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DeviceRepository) private readonly repository: DeviceRepository,
    @Inject(DeviceTypesRepository)
    private readonly typesRepository: DeviceTypesRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(MqttService) private readonly mqttService: MqttService,
    @InjectModel(Device.name) private devicesModel: Model<IDeviceMongo>,
  ) {}

  async create(device: DeviceCreateDTO): Promise<DeviceEntity> {
    const deviceExists = await this.repository.getByName(device.name);

    if (deviceExists) {
      throw new BadRequestException('Device already exists. Try another name');
    }

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    const createdDevice = await this.repository.save(device);
    createdDevice.topic = `devices/${createdDevice.id}`;

    const updatedDevice = await this.update(createdDevice);

    return updatedDevice;
  }

  async list(): Promise<[DeviceEntity[], number]> {
    const cachedDevices: DeviceEntity[] = await this.cacheManager.get(
      BaseRedisKeys.DEVICES,
    );

    if (cachedDevices) {
      return [cachedDevices, cachedDevices.length];
    }

    const devices = await this.repository.list();

    await this.cacheManager.set(BaseRedisKeys.DEVICES, devices[0]);

    return devices;
  }

  async getTypes(): Promise<[DeviceTypesEntity[], number]> {
    const cachedTypes: DeviceTypesEntity[] = await this.cacheManager.get(
      BaseRedisKeys.TYPES,
    );

    if (cachedTypes) {
      return [cachedTypes, cachedTypes.length];
    }

    const types = await this.typesRepository.list();

    await this.cacheManager.set(BaseRedisKeys.TYPES, types[0]);

    return types;
  }

  async getById(id: number): Promise<DeviceEntity> {
    const device = await this.repository.getById(id);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  async update(device: DeviceUpdateDTO): Promise<DeviceEntity> {
    await this.repository.getById(device.id);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    await this.repository.update(device.id, device);
    return await this.getById(device.id);
  }

  async delete(id: number): Promise<DeviceEntity> {
    const device = await this.repository.getById(id);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    await this.repository.softDelete(id);

    return device;
  }

  async activate(deviceId: number): Promise<DeviceEntity> {
    const deviceEntity = await this.repository.getById(deviceId);

    if (!deviceEntity) {
      throw new NotFoundException('Device not found');
    }

    if (deviceEntity.isActive) {
      throw new BadRequestException('Device is already active');
    }

    deviceEntity.isActive = true;

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    await this.repository.save(deviceEntity);

    const topic = `devices/${deviceId}`;

    const mqttDTO = new PubMQTTDTO(
      deviceEntity.id,
      'Device activated',
      deviceEntity.name,
      deviceEntity.isActive,
    );

    this.mqttService.publish(topic, mqttDTO);

    return deviceEntity;
  }

  async deactivate(deviceId: number): Promise<DeviceEntity> {
    const deviceEntity = await this.repository.getById(deviceId);

    if (!deviceEntity) {
      throw new NotFoundException('Device not found');
    }

    if (!deviceEntity.isActive) {
      throw new BadRequestException('Device already deactivated');
    }

    deviceEntity.isActive = false;

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    await this.repository.save(deviceEntity);

    const topic = `devices/${deviceId}`;

    const mqttDTO = new PubMQTTDTO(
      deviceEntity.id,
      'Device deactivated',
      deviceEntity.name,
      deviceEntity.isActive,
    );

    this.mqttService.publish(topic, mqttDTO);

    return deviceEntity;
  }

  async getPorcentageDayActive(
    deviceId: number,
  ): Promise<{ percentage: number; hoursActive: number }> {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    const deviceData = await this.devicesModel
      .find({
        deviceId: deviceId,
        timeStamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timeStamp: 1 }); // Ordena por timeStamp em ordem crescente

    if (!deviceData || deviceData.length === 0) {
      throw new NotFoundException(
        'Device data not found for the specified deviceId and date range.',
      );
    }

    let totalActiveTime = 0;
    let lastActiveTime = startDate.getTime();

    for (const data of deviceData) {
      if (data.isActive) {
        lastActiveTime = data.timeStamp.getTime();
      } else {
        totalActiveTime += data.timeStamp.getTime() - lastActiveTime;
      }
    }

    if (deviceData[deviceData.length - 1].isActive) {
      totalActiveTime += currentDate.getTime() - lastActiveTime;
    }

    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const percentage = (totalActiveTime / millisecondsInADay) * 100;
    const hoursActive = totalActiveTime / (60 * 60 * 1000);

    return { percentage, hoursActive };
  }
}
