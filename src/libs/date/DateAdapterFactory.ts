/* eslint-disable @typescript-eslint/no-var-requires */
import { IDate, IDateConstructor } from './types/Date.interface';
import { DateConfig } from './types/DateConfig.interface';

export class DateAdapterFactory {
  static readonly adapterClassRegistry: Record<string, () => IDateConstructor> =
    {
      dayjs: () => require('./adapters/dayjs/DayjsAdapter')['DayjsAdapter'],
    };

  static make(date: string, config: DateConfig): IDate {
    const { adapter } = config;
    if (typeof adapter === 'string') {
      const getAdapterClass = DateAdapterFactory.adapterClassRegistry[adapter];
      if (!getAdapterClass)
        throw new Error(`Unsupported date adapter: ${adapter}`);
      const AdapterClass = getAdapterClass();
      return new AdapterClass(date, config);
    } else {
      return new adapter(date, config);
    }
  }
}
