import axios from "axios";
import { IDevice } from "../interfaces/device.interface";

export class DeviceController {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_BASE_URL;
  }

  async getAll() {
    try {
      const result = axios.get(`${this.apiUrl}/`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id: number) {
    try {
      const result = axios.get(`${this.apiUrl}/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(device: IDevice) {
    try {
      const result = axios.put(`${this.apiUrl}/`, {
        data: { ...device },
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
