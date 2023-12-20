import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(utc);

const displayShortDate = (date: string) => {
  return dayjs(date).format("MMM DD");
};

const displayLongDate = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY - hh:mm A");
};

const displayDateDifference = (date: string) => {
  const now = dayjs();

  let difference = 0;

  difference = now.diff(date, "second");

  if (difference < 60) {
    return `a few seconds`;
  }

  difference = now.diff(date, "minute");

  if (difference < 60) {
    if (difference === 1) {
      return `a minute`;
    } else if (difference < 10) {
      return `a few minutes`;
    } else {
      return `${difference} minutes`;
    }
  }

  difference = now.diff(date, "hour");

  if (difference < 24) {
    if (difference === 1) {
      return `an hour`;
    } else {
      return `${difference} hours`;
    }
  }

  difference = now.diff(date, "day");

  if (difference < 30) {
    if (difference === 1) {
      return `a day`;
    } else {
      return `${difference} days`;
    }
  }

  difference = now.diff(date, "month");

  if (difference < 12) {
    if (difference === 1) {
      return `a month`;
    } else {
      return `${difference} months`;
    }
  }

  difference = now.diff(date, "year");

  if (difference === 1) {
    return `a year`;
  } else {
    return `${difference} years`;
  }
};

export { displayShortDate, displayLongDate, displayDateDifference };
