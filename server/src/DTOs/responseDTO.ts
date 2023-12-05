export class ResponseDTO {
  message: string;
  data?: any;
  statusCode?: number;

  constructor(message: string, data?: any, statusCode?: number) {
    if (!statusCode) {
      this.statusCode = 200;
    }

    this.message = message;
    this.data = data;
  }
}
