import { prependZero } from './number';

export const dateToSeconds = (date: Date) => {
  let seconds = 0;
  seconds += date.getHours() * 3600;
  seconds += date.getMinutes() * 60;
  seconds += date.getSeconds();
  seconds += date.getMilliseconds() / 1000;
  return seconds;
};

export const secondsToDate = (totalSeconds: number) => {
  const seconds = Math.floor(totalSeconds);
  const date = new Date();
  date.setHours(Math.floor(seconds / 3600));
  date.setMinutes(Math.floor((seconds % 3600) / 60));
  date.setSeconds(seconds % 60);
  date.setMilliseconds((totalSeconds * 1000) % 1000);
  return date;
};

export const millisToDecimalSeconds = (millis: number) => {
  const seconds = Math.floor(millis / 1000);
  const decimal = Math.floor((millis % 1000) / 100) / 10;
  return seconds + decimal;
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

export const timeStringToDate = (
  str: string,
  config: {
    optHours?: boolean;
    shortMillis?: boolean;
  } = {}
) => {
  const values = str.split(':');
  const hours = config.optHours ? 0 : values[0];
  const minutes = config.optHours ? values[0] : values[1];
  const secondsAndMillis = config.optHours ? values[1] : values[2];
  const [seconds, millis] = secondsAndMillis.split('.');
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(Number(seconds));
  date.setMilliseconds(
    config.shortMillis ? Number(millis) * 100 : Number(millis)
  );
  return date;
};

export const formatTime = (seconds: number) => {
  return dateToTimeString(secondsToDate(seconds), {
    optHours: true,
    shortMillis: true,
  });
};
export const parseTime = (timeString: string) => {
  return dateToSeconds(
    timeStringToDate(timeString, {
      optHours: true,
      shortMillis: true,
    })
  );
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
