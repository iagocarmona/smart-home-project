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

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DeviceRepository) private readonly repository: DeviceRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const devices = await this.repository.list();

    await this.cacheManager.set(BaseRedisKeys.DEVICES, devices);

    return devices;
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
}
