import { IDateConfig } from './DateConfig.interface';

export interface IDateConstructor {
  new (date: string, config: IDateConfig): IDate;
}
export interface IDate {
  isValid: (date: string) => boolean;
  toDateObject: (date: string) => IDate;
  format: (format: string) => IDate;
}
