// note only check if property exists on obj (and not on prototype chain, i.e: inherited props)
export const objHasOwnProperty = (obj: Record<string, unknown>, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

export const omit = (obj: Record<string, unknown>, ...props: string[]) => {
  return props.reduce((accumulate, prop) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [prop]: omit, ...rest } = accumulate;
    return rest;
  }, obj);
};

export const pluck = (obj: Record<string, unknown>, ...props: string[]) => {
  return props.reduce((accumulate, prop) => {
    /* eslint-disable no-unused-vars */
    return { ...accumulate, [prop]: obj?.[prop] };
  }, {});
};
