export function prependZero(num: number | string, limit = 10) {
  return Number(num) < limit ? `0${num}` : num;
}

export function mul(num1?: number, num2?: number) {
  return num1 && num2 && num1 * num2;
}

export function roundDecimal(num: number, place: number) {
  return +(Math.round(+`${num}e+${place}`) + `e-${place}`);
}
