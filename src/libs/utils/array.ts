import { shallowEqual } from './common';

export const arrayToObject = <T>(
  arr: T[],
  cb: (current: T, index: number) => { k: string; v: T },
) => {
  const mapper: Record<string, T> = {};
  arr.forEach((ele, index) => {
    const { k, v } = cb(ele, index);
    mapper[k] = v;
  });
  return mapper;
};

export const arrayDiff = <T, Q>(
  oldArr: T[],
  newArr: Q[],
  eleKeyFn: <E>(ele: E) => { k: string; v: E },
  compareFn = (oldEle: T, newEle: Q) => shallowEqual(oldEle, newEle),
) => {
  const add: Q[] = [];
  const remove: T[] = [];
  const update: { old: T; new: Q }[] = [];
  const oldArrMap = arrayToObject(oldArr, eleKeyFn);
  const newArrMap = arrayToObject(newArr, eleKeyFn);
  oldArr.forEach((ele) => {
    const { k } = eleKeyFn(ele);
    if (!newArrMap[k]) {
      remove.push(ele);
    } else if (newArrMap[k] && !compareFn(ele, newArrMap[k])) {
      update.push({ old: ele, new: newArrMap[k] });
    }
  });
  newArr.forEach((ele) => {
    const { k } = eleKeyFn(ele);
    if (!oldArrMap[k]) {
      add.push(ele);
    }
  });
  return {
    add,
    remove,
    update,
  };
};
