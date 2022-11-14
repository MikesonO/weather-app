import getLocalDate from "./dateConversion";

const displayData = (location, weather) => {

  const city = document.getElementById("city");
  city.textContent = `${location.name},`;

  const country = document.getElementById("country");
  country.textContent = location.country;

  const date = document.getElementById("date");
  date.textContent = getLocalDate(weather.timezone).date;

  const day = document.getElementById("day");
  day.textContent = `${getLocalDate(weather.timezone).day},`;

  const time = document.getElementById("time");
  time.textContent = getLocalDate(weather.timezone).time;



  // const timeAndDate = getLocalTime(weather.timezone);


  // displayData(cityName, countryName, timeAndDate);

  // const {
  //   temp,
  //   humidity
  // } = weather.main;

}

export default displayData;