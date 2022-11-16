import {
  format
} from 'date-fns';

const isDayTime = (date) => {
  const hours = date.getHours()
  const dayTime = hours > 6 && hours < 20;
  return dayTime;
}

const formatTime = (timezone, time) => {
  const oldTime = time * 1000;
  const localTime = oldTime + 1000 * timezone;
  const localDate = new Date(localTime);
  const checkTime = isDayTime(localDate);
  const formattedTime = format(localDate, "p")
  return {
    time: formattedTime,
    dayTime: checkTime
  };
};


function getLocalDate(timezone) {
  const date = new Date();
  const time = date.getTime();
  const localTime = time + 1000 * timezone;
  let localDate = new Date(localTime);
  const checkTime = isDayTime(localDate);
  const getDay = format(localDate, "EEEE");
  const getTime = format(localDate, "p");
  localDate = format(localDate, "do MMMM yyyy");

  return {
    day: getDay,
    date: localDate,
    time: getTime,
    dayTime: checkTime
  }
}

export default {
  getLocalDate,
  formatTime
}