import { IsBoolean, IsInt, IsString, Min } from 'class-validator';

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

  @IsBoolean()
  isActive: boolean;
}

export class DeviceCreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;
}
