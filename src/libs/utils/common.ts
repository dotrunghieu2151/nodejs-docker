import merge from 'deepmerge';
import {
  deepEqual as fastDeepEqual,
  shallowEqual as fastShallowEqual,
} from 'fast-equals';
import fastDeepClone from 'rfdc';

import { randomIntBetween } from './number';

export const isFunction = (
  v: unknown,
): v is (() => unknown) | ((...args: unknown[]) => unknown) =>
  typeof v === 'function';

export const isString = (v: unknown): v is string => typeof v === 'string';

export const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

export const isNumber = (v: unknown): v is number => typeof v === 'number';

export const toNumber = (v: unknown) => Number(v);

export const isNumeric = <T>(v: T) => {
  if (isNumber(v)) return true;
  if (!isString(v)) return false; // we only process strings!
  return !isNaN(parseFloat(v)); // ...and ensure strings of whitespace fail
};

export const isObjectEmpty = (v: unknown) =>
  isObject(v) && Object.keys(v).length === 0;

export const isEmpty = (v: unknown) =>
  !v || (Array.isArray(v) && v.length === 0) || isObjectEmpty(v);

export const deepEqual = <T, Q>(x: T, y: Q) => fastDeepEqual(x, y);

export const shallowEqual = <T, Q>(x: T, y: Q) => fastShallowEqual(x, y);

export const mergeDeep = <T, Q>(
  x: Partial<T>,
  y: Partial<Q>,
  options?: merge.Options,
) => merge(x, y, options);

export const deepClone = <T>(obj: T, options: fastDeepClone.Options = {}) => {
  const cloneFn = fastDeepClone({ proto: true, ...options });
  return cloneFn(obj);
};

// export const mergeDeep = (...objects: Record<string, unknown>[]) => {
//   return objects.reduce((prev, obj) => {
//     Object.keys(obj).forEach((key) => {
//       const pVal = prev[key];
//       const oVal = obj[key];

//       if (Array.isArray(pVal) && Array.isArray(oVal)) {
//         prev[key] = pVal.concat(...oVal);
//       } else if (isObject(pVal) && isObject(oVal)) {
//         prev[key] = mergeDeep(pVal as Record<string, unknown>, oVal);
//       } else {
//         prev[key] = oVal;
//       }
//     });

//     return prev;
//   }, {});
// };

export function debounce(
  cb: (() => unknown) | ((...args: unknown[]) => unknown),
  wait: number,
  immediate: boolean,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (...args: unknown[]) {
    const later = function () {
      timeout = undefined;
      if (!immediate) cb(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) cb(...args);
  };
}

// simple forLoop to use instead of array.map to save performance
export const forLoop = <T>(
  arr: T[],
  cb: <T>(ele: T, index: number) => void,
  start = 0,
  step = 1,
) => {
  for (let i = start; i < arr.length; i += step) {
    cb(arr[i], i);
  }
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomFromPool = <T>(valuePool: T[]) => {
  let cache = [...valuePool];
  return () => {
    const randomIndex = randomIntBetween(0, cache.length);
    const val = cache[randomIndex];
    cache.splice(randomIndex, 1);
    if (cache.length === 0) cache = [...valuePool];
    return val;
  };
};

export const performanceMeasure =
  (fn: (() => unknown) | ((...args: unknown[]) => unknown)) =>
  (...args: unknown[]) => {
    const t0 = performance.now(); // for browser only
    fn(...args);
    const t1 = performance.now();
    console.log(`Call to ${fn.name} took ${t1 - t0} miliseconds`);
  };

// // when DateTimeObj is convert to number, it becomes timestamp so we can use subtraction here
// export const getDayDiff = (date1, date2) =>
//   Math.round(Math.abs((date2 - date1) / (1000 * 3600 * 24)));
