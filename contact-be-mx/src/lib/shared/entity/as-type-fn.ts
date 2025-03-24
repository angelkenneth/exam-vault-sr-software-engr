/**
 * Usually used to force the end return type of a pipe of functions
 */
export const asTypeFn =
  <TReturn>() =>
  (a: unknown) =>
    a as TReturn;
