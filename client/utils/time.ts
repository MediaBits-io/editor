import { prependZero } from './number';

export const formatDateToValue = (date: Date) => {
  const hours = prependZero(date.getHours());
  const minutes = prependZero(date.getMinutes());
  const seconds = prependZero(date.getSeconds());
  const millis = prependZero(prependZero(date.getMilliseconds()), 100);
  return `${[hours, minutes, seconds].join(':')}.${millis}`;
};

export const parseDateFromValue = (str: string) => {
  const [hours, minutes, secondsAndMillis] = str.split(':');
  const [seconds, millis] = secondsAndMillis.split('.');
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(Number(seconds));
  date.setMilliseconds(Number(millis));
  return date;
};

export const formatDuration = (time: number, round = true) => {
  const seconds = round ? Math.floor(time % 60) : time % 60;
  const minutes = Math.floor((time % 3600) / 60);

  return [
    time >= 3600 ? prependZero(Math.floor(time / 3600)) : null,
    time ? (time >= 3600 ? prependZero(minutes) : minutes) : null,
    time && prependZero(seconds),
  ]
    .filter((val) => val !== null)
    .join(':');
};

function sameYear(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear();
}

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const formatDateTime = (date: Date, short = false) => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const recentDay =
    (sameDay(today, date) && 'Today') ||
    (sameDay(yesterday, date) && 'Yesterday');

  if (recentDay) {
    const time = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);

    return `${recentDay}, ${time}`;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: short && sameYear(today, date) ? undefined : 'numeric',
    month: short ? 'short' : 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};
