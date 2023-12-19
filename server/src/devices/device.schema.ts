import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Device {
  @Prop()
  deviceId: number;

  @Prop()
  deviceName: string;

  @Prop()
  message: string;

  @Prop()
  isActive: boolean;

  @Prop()
  timeStamp: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
