import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { PagedDataDTO } from 'src/DTOs/pagedDataDTO';
import { ResponseDTO } from 'src/DTOs/responseDTO';
import { DeviceCreateDTO, DeviceUpdateDTO } from './device.dto';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() body: DeviceCreateDTO): Promise<ResponseDTO> {
    const createdDevice = await this.deviceService.create(body);
    return new ResponseDTO('Successfully created', createdDevice);
  }

  @Get()
  async list(): Promise<PagedDataDTO> {
    const [entities, count] = await this.deviceService.list();
    return new PagedDataDTO(count, entities);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const device = await this.deviceService.getById(id);
    return new ResponseDTO('Successfully retrieved', device);
  }

  @Put()
  async update(@Body() body: DeviceUpdateDTO): Promise<ResponseDTO> {
    const updatedDevice = await this.deviceService.update(body);
    return new ResponseDTO('Successfully updated', updatedDevice);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const deletedDevice = await this.deviceService.delete(id);
    return new ResponseDTO('Successfully deleted', deletedDevice);
  }
}
