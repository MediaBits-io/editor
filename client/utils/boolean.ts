export const isTruthy = <T>(
  val: T | false | undefined | null | '' | 0
): val is T => !!val;
