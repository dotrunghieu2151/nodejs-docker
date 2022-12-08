export type GenericFunction =
  | (() => unknown)
  | ((...args: unknown[]) => unknown);
