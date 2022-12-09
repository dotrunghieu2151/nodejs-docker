import { IDayjsAdapterConfig } from '../adapters/dayjs/DayjsAdapter.type';

import { IDateConstructor } from './Date.interface';

export interface IDateConfig {
  adapter: string | IDateConstructor;
}

export interface ICustomDateConfig extends IDateConfig {
  adapter: IDateConstructor;
}

export type DateConfig = IDayjsAdapterConfig | ICustomDateConfig; // DateConfig is union type of all adapter configs

export type SupportedAdapters = DateConfig['adapter'] extends IDateConstructor
  ? never
  : DateConfig['adapter'];
