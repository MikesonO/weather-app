import getLocalDate from "./dateConversion";
import helperFunctions from './helperFunctions';

const weatherDescription = {
  // Clear Sky
  '01': {
    image: "../src/assets/icons/clear_sky",
    video: ""
  },
  // Few Clouds
  '02': {
    image: "../src/assets/icons/few_clouds",
    video: ""
  },
  // Scattered Clouds
  '03': {
    image: "../src/assets/icons/overcast_clouds",
    video: ""
  },
  // Broken Clouds
  '04': {
    image: "../src/assets/icons/overcast_clouds",
    video: ""
  },
  // Shower Rain'
  '09': {
    image: "../src/assets/icons/shower_rain",
    video: ""
  },
  // Rain
  '10': {
    image: "../src/assets/icons/rain",
    video: ""
  },
  // Thunderstorm
  '11': {
    image: "../src/assets/icons/thunderstorm",
    video: ""
  },
  // Snow
  '13': {
    image: "../src/assets/icons/snow",
    video: ""
  },
  // Mist
  '50': {
    image: "../src/assets/icons/mist",
    video: ""
  }
};

const getWeatherDescription = (weather) => {
  let id = helperFunctions.capitaliseWords(weather.weather[0].icon);
  id = id.slice(0, -1);
  console.log(id);
  return weatherDescription[id];
}


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

  const weatherInfo = getWeatherDescription(weather);
  const weatherIcon = document.getElementById("weather-icon");

  if (getLocalDate(weather.timezone).dayTime) {
    weatherIcon.src = `${weatherInfo.image}.png`;
  } else {
    weatherIcon.src = `${weatherInfo.image}_night.png`;
  }





  const temp = document.getElementById("temp");
  temp.textContent = Math.round(weather.main.temp);

  const description = document.getElementById("description");
  description.textContent = helperFunctions.capitaliseWords(weather.weather[0].description);



  // const timeAndDate = getLocalTime(weather.timezone);


  // displayData(cityName, countryName, timeAndDate);

  // const {
  //   temp,
  //   humidity
  // } = weather.main;

}

export default displayData;