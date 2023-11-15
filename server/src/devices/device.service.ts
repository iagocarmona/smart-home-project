import { Injectable } from '@nestjs/common';
import { IDevice } from './interfaces/device.interface';

@Injectable()
export class DeviceService {
  private readonly devices: IDevice[] = [];

  create(device: IDevice) {
    this.devices.push(device);

    return device;
  }

  findAll(): IDevice[] {
    return this.devices;
  }
}
