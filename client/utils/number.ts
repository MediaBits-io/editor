export function prependZero(num: number | string, limit = 10) {
  return Number(num) < limit ? `0${num}` : num;
}
