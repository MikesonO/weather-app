import dateFunction from "./dateConversion";
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
  let id = weather.weather[0].icon;
  id = id.slice(0, -1);
  return weatherDescription[id];
}


const displayData = (location, weather, unit) => {

  const city = document.getElementById("city");
  city.textContent = `${location.name},`;

  const country = document.getElementById("country");
  country.textContent = location.country;

  const date = document.getElementById("date");
  date.textContent = dateFunction.getLocalDate(weather.timezone).date;

  const day = document.getElementById("day");
  day.textContent = `${dateFunction.getLocalDate(weather.timezone).day},`;

  const time = document.getElementById("time");
  time.textContent = dateFunction.getLocalDate(weather.timezone).time;

  const weatherInfo = getWeatherDescription(weather);
  const weatherIcon = document.getElementById("weather-icon");

  if (dateFunction.getLocalDate(weather.timezone).dayTime) {
    weatherIcon.src = `${weatherInfo.image}.png`;
  } else {
    weatherIcon.src = `${weatherInfo.image}_night.png`;
  }

  const temp = document.getElementById("temp");
  temp.textContent = Math.round(weather.main.temp);

  const description = document.getElementById("description");
  description.textContent = helperFunctions.capitaliseWords(weather.weather[0].description);



  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const windSpeed = document.getElementById("wind-speed");
  const windSpeedIcon = document.getElementById("wind-speed-arrow");
  windSpeedIcon.style.transform = `rotate(${weather.wind.deg}deg)`;

  if (unit === "imperial") {
    maxTemp.textContent = `${Math.round(weather.main.temp_max)} °F`;
    minTemp.textContent = `${Math.round(weather.main.temp_min)} °F`;
    windSpeed.textContent = `${Math.round(weather.wind.speed)} mph`;
  } else if (unit === "metric") {
    maxTemp.textContent = `${Math.round(weather.main.temp_max)} °C`;
    minTemp.textContent = `${Math.round(weather.main.temp_min)} °C`;
    windSpeed.textContent = `${Math.round(weather.wind.speed)} m/s`;
  }

  const humidity = document.getElementById("humidity");
  humidity.textContent = `${weather.main.humidity}%`;

  const sunrise = document.getElementById("sunrise");
  sunrise.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunrise).time}`;
  const sunset = document.getElementById("sunset");
  sunset.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunset).time}`;

}

const createCard = (forecast, unit, i, timezone) => {
  const card = document.createElement("div");
  card.setAttribute("class", "forecast-card");

  const time = document.createElement("h3");
  time.setAttribute("class", "forecast-time");

  if (i === 0) {
    time.textContent = "Now"
  } else {
    time.textContent = `${dateFunction.formatTime(timezone, forecast.hourly[i].dt).time}`
  }

  const icon = document.createElement("img");
  icon.setAttribute("class", "forecast-icon");

  if (dateFunction.formatTime(timezone, forecast.hourly[i].dt).dayTime) {
    icon.src = `${getWeatherDescription(forecast.hourly[i]).image}.png`;
  } else {
    icon.src = `${getWeatherDescription(forecast.hourly[i]).image}_night.png`;
  }

  icon.alt = "Weather Icon";

  const temperature = document.createElement("h3");
  temperature.setAttribute("class", "forecast-temp");

  if (unit === "imperial") {
    temperature.textContent = `${Math.round(forecast.hourly[i].temp)} °F`
  } else if (unit === "metric") {
    temperature.textContent = `${Math.round(forecast.hourly[i].temp)} °C`
  }


  card.append(time, icon, temperature)

  return card;
}

const displayForecast = (forecast, unit, timezone) => {
  const container = document.querySelector(".forecast-cards-container");
  container.textContent = "";

  for (let i = 0; i < 7; i += 1) {
    container.append(createCard(forecast, unit, i, timezone));
  }

}

export {
  displayData,
  displayForecast
}