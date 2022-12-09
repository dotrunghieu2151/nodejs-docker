import fastJson from 'fast-json-stringify';
import stringify from 'fast-safe-stringify';

import { isObject } from './common';

const tryJSONStringify = <T extends Record<string, unknown>>(obj: T) => {
  try {
    return JSON.stringify(obj);
  } catch (_) {}
};

const JSONSafeStringify = <T extends Record<string, unknown>>(obj: T) =>
  tryJSONStringify(obj) || stringify(obj);

export const JSONStringify = <
  T extends Record<string, unknown>,
  Schema extends Record<string, unknown>,
>(
  obj: T,
  schema?: Schema,
): string => {
  if (!schema || !isObject(schema)) return JSONSafeStringify(obj);
  const stringify = fastJson(schema);
  return stringify(obj);
};

export const JSONParse = (value: string) => {
  try {
    const result: string = JSON.parse(value);
    return result;
  } catch (e) {
    return null;
  }
};
