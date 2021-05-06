import { prependZero } from './number';

export const secondsToDate = (totalSeconds: number) => {
  const seconds = Math.floor(totalSeconds);
  const date = new Date();
  date.setHours(Math.floor(seconds / 3600));
  date.setMinutes(Math.floor((seconds % 3600) / 60));
  date.setSeconds(seconds % 60);
  date.setMilliseconds(
    Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000)
  );
  return date;
};

export const dateToTimeString = (
  date: Date,
  config: {
    optHours?: boolean;
    optMinutes?: boolean;
    shortMillis?: boolean;
  } = {}
) => {
  const hours =
    !config.optHours || date.getHours() > 0
      ? prependZero(date.getHours())
      : undefined;
  const minutes =
    !config.optMinutes || date.getMinutes() > 0 || date.getHours() > 0
      ? prependZero(date.getMinutes())
      : undefined;
  const seconds = prependZero(date.getSeconds());
  const millis = config.shortMillis
    ? Math.floor(date.getMilliseconds() / 100)
    : prependZero(prependZero(date.getMilliseconds()), 100);
  return `${[hours, minutes, seconds]
    .filter((val) => val !== undefined)
    .join(':')}.${millis}`;
};

export const timeStringToDate = (str: string) => {
  const [hours, minutes, secondsAndMillis] = str.split(':');
  const [seconds, millis] = secondsAndMillis.split('.');
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(Number(seconds));
  date.setMilliseconds(Number(millis));
  return date;
};

export const formatTime = (milliseconds: number) => {
  return dateToTimeString(secondsToDate(milliseconds / 1000), {
    optHours: true,
    shortMillis: true,
  });
};

export const formatDuration = (totalSeconds: number, round = true) => {
  const seconds = round ? Math.floor(totalSeconds % 60) : totalSeconds % 60;
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return [
    totalSeconds >= 3600 ? prependZero(Math.floor(totalSeconds / 3600)) : null,
    totalSeconds
      ? totalSeconds >= 3600
        ? prependZero(minutes)
        : minutes
      : null,
    totalSeconds && prependZero(seconds),
  ]
    .filter((val) => val !== null)
    .join(':');
};
