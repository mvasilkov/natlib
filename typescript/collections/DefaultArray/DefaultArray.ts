// returns an Array of `length` elements filled with `value`
// `value' defaults to `0`
export const defaultArray = (length: number, value: any = 0) =>
  Array.from({ length }, () => value)
