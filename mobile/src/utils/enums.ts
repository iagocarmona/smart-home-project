export enum RoutesEnum {
  Devices = 'devices',
  CreateDevice = 'create-device',
}

export enum DeviceTypes {
  Lamp = 1,
  Switch = 2,
  Sensor = 3,
  Camera = 4,
  Door = 5,
  Window = 6,
  Lock = 7,
  Alarm = 8,
  Thermostat = 9,
  Speaker = 10,
  Vacuum = 11,
  Robot = 12,
  Display = 13,
  Alexa = 14,
  Other = 15,
}

export const DeviceTypesText = ["Lamp", "Switch", "Sensor", "Camera", "Door", "Window", "Lock", "Alarm", "Thermostat", "Speaker", "Vacuum", "Robot", "Display", "Alexa", "Other"]
  
export enum DeviceTypeIcons {
  Lamp = "lamp-outline", 
  Switch = 'switch',
  Sensor = 'radio',
  Camera = 'camera',
  Door = 'door',
  Window = 'window-closed-variant',
  Lock = 'lock-outline',
  Alarm = 'alarm',
  Thermostat = 'thermostat',
  Speaker = 'speaker',
  Vacuum = 'vacuum',
  Robot = 'robot',
  Display = 'television',
  Alexa = 'surround-sound',
  Other = 'devices',
}