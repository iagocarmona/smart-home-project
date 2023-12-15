export class PagedDataDTO {
  count: number;
  data: any;

  constructor(count: number, data: any) {
    if (count) this.count = count;
    if (data) this.data = data;
  }
}
