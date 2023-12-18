import  { AxiosResponse } from "axios";
import { IDevice } from "../interfaces/device.interface";
import { ApiResponse } from "../interfaces/api.interface";
import api from "../config/api.config";
import { DeviceDTO } from "../DTO/device.dto";

export class DeviceController {
  private apiUrl: string;
  private alias: string

  constructor() {
    this.apiUrl = "http://192.168.1.12:3000";
    this.alias = "/devices";
  }

  async create(device: IDevice): Promise<DeviceDTO> {
    try {
      const url = `${this.apiUrl}${this.alias}/`
      const response: AxiosResponse<ApiResponse> = await api.post(url, { ...device });

      const deviceCreated: DeviceDTO = response.data.data;

      return deviceCreated;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<DeviceDTO[]> {
    try {
      const url = `${this.apiUrl}${this.alias}/`
      const response: AxiosResponse<ApiResponse> = await api.get(url);
      const devices: DeviceDTO[] = response.data.data

      return devices;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id: number) {
    try {
      const result: AxiosResponse<ApiResponse> = await api.get(`${this.apiUrl}${this.alias}/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDeviceTypes() {
    try {
      const result: AxiosResponse<ApiResponse> = await api.get(`${this.apiUrl}${this.alias}/types`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(device: IDevice) {
    try {
      const result: AxiosResponse<ApiResponse> = await api.put(`${this.apiUrl}${this.alias}/`, {
        data: { ...device },
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async active(deviceId: number) {
    try {
      const result: AxiosResponse<ApiResponse> = await api.post(`${this.apiUrl}${this.alias}/activate/${deviceId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deactive(deviceId: number) {
    try {
      const result: AxiosResponse<ApiResponse> = await api.post(`${this.apiUrl}${this.alias}/deactivate/${deviceId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
