import {
  format
} from 'date-fns';

export default function getLocalDate(timezone) {
  const date = new Date();
  const time = date.getTime();
  const localTime = time + 1000 * timezone;
  let localDate = new Date(localTime);
  const getTime = format(localDate, "p");
  localDate = format(localDate, "do MMMM yyyy");

  return {
    date: localDate,
    time: getTime
  }
}