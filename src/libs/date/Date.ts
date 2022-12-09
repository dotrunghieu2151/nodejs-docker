import { DateAdapterFactory } from './DateAdapterFactory';
import { IDate } from './types/Date.interface';
import { DateConfig } from './types/DateConfig.interface';

export class Date implements IDate {
  private dateAdapter: IDate;
  private readonly date: string;

  constructor(date: string, config: DateConfig) {
    this.date = date;
    this.switchAdapter(date, config);
  }

  switchAdapter(date: string, config: DateConfig) {
    this.dateAdapter = DateAdapterFactory.make(date, config);
  }
}
