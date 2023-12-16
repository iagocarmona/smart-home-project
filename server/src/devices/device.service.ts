import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceCreateDTO, DeviceUpdateDTO } from './device.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BaseRedisKeys } from 'src/helpers/redis';
import { MqttService } from 'src/MQTT/mqtt.service';
import { PubMQTTDTO } from 'src/DTOs/pubMQTT.dto';
import { DeviceTypesEntity } from 'src/entities/deviceType.entity';
import { DeviceTypesRepository } from './deviceType.repository';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DeviceRepository) private readonly repository: DeviceRepository,
    @Inject(DeviceTypesRepository)
    private readonly typesRepository: DeviceTypesRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(MqttService) private readonly mqttService: MqttService,
  ) {}

  async create(device: DeviceCreateDTO): Promise<DeviceEntity> {
    const deviceExists = await this.repository.getByName(device.name);

    if (deviceExists) {
      throw new BadRequestException('Device already exists. Try another name');
    }

    await this.cacheManager.del(BaseRedisKeys.DEVICES);

    return await this.repository.save(device);
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
}
