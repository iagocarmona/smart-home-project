import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { IDevice } from './interfaces/device.interface';
import { PagedDataDTO } from 'src/DTOs/pagedDataDTO';

@Controller('devices')
export class DeviceController {
  private readonly deviceService: DeviceService;

  @Post()
  async create(@Body() body: IDevice): Promise<IDevice> {
    return this.deviceService.create(body);
  }

  @Get()
  async list(): Promise<PagedDataDTO> {
    const [entities, count] = await this.deviceService.list();
    return new PagedDataDTO(count, entities);
  }
}
