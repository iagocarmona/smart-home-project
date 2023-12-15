export class PubMQTTDTO {
  deviceId: number;
  message: string;
  deviceName: string;
  isActive: boolean;

  constructor(
    deviceId: number,
    message: string,
    deviceName: string,
    isActive: boolean,
  ) {
    this.deviceId = deviceId;
    this.message = message;
    this.deviceName = deviceName;
    this.isActive = isActive;
  }
}
