import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { IDevice } from './interfaces/device.interface';

@Controller('devices')
export class DeviceController {
  private readonly deviceService: DeviceService;

  @Post()
  async create(@Body() body: IDevice): Promise<IDevice> {
    return this.deviceService.create(body);
  }

  @Get()
  async findAll(): Promise<string> {
    return 'This action returns all cats';
  }
}
