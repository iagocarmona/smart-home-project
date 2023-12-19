import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import { Document } from 'mongoose';

export class DeviceIdDTO {
  @IsInt()
  @Min(1)
  id: number;
}

export class DeviceUpdateDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  deviceTypeId: number;

  @IsBoolean()
  isActive: boolean;
}

export class DeviceCreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  deviceTypeId: number;

  @IsBoolean()
  isActive: boolean;
}

export interface IDeviceMongo extends Document {
  readonly deviceId: number;
  readonly deviceName: string;
  readonly isActive: boolean;
  readonly timeStamp: Date;
  readonly message: string;
}
