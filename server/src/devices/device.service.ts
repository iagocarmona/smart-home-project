import { Inject, Injectable } from '@nestjs/common';
import { IDevice } from './interfaces/device.interface';
import { DeviceRepository } from './device.repository';
import { DeviceEntity } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DeviceRepository) private readonly repository: DeviceRepository,
  ) {}

  async create(device: IDevice) {
    return this.repository.save(device);
  }

  async list(): Promise<[DeviceEntity[], number]> {
    return this.repository.list();
  }
}
