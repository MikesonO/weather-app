import dateFunction from "./dateConversion";
import helperFunctions from './helperFunctions';
import clearSky from "../../assets/icons/clear_sky.png";
import clearSkyNight from "../../assets/icons/clear_sky_night.png";
import clearSkyVideo from "../../assets/background/clear_sky.mp4";
import fewClouds from "../../assets/icons/few_clouds.png";
import fewCloudsNight from "../../assets/icons/few_clouds_night.png";
import fewCloudsVideo from "../../assets/background/few_clouds.mp4";
import scatteredCloudsVideo from "../../assets/background/scattered_clouds.mp4";
import brokenClouds from "../../assets/icons/overcast_clouds.png";
import brokenCloudsNight from "../../assets/icons/overcast_clouds_night.png";
import brokenCloudsVideo from "../../assets/background/overcast_clouds.mp4";
import showerRain from "../../assets/icons/shower_rain.png";
import showerRainNight from "../../assets/icons/shower_rain_night.png";
import rain from "../../assets/icons/rain.png";
import rainNight from "../../assets/icons/rain_night.png";
import rainVideo from "../../assets/background/rain.mp4";
import thunderstorm from "../../assets/icons/thunderstorm.png";
import thunderstormNight from "../../assets/icons/thunderstorm_night.png";
import thunderstormVideo from "../../assets/background/thunderstorm.mp4";
import snow from "../../assets/icons/snow.png";
import snowNight from "../../assets/icons/snow_night.png";
import snowVideo from "../../assets/background/snow.mp4";
import mist from "../../assets/icons/mist.png";
import mistNight from "../../assets/icons/mist_night.png";
import mistVideo from "../../assets/background/mist.mp4";
import sunriseIcon from "../../assets/icons/sunrise.svg";
import sunsetIcon from "../../assets/icons/sunset.svg";

const weatherDescription = {
  // Clear Sky
  '01': {
    dayImage: clearSky,
    nightImage: clearSkyNight,
    video: clearSkyVideo
  },
  // Few Clouds
  '02': {
    dayImage: fewClouds,
    nightImage: fewCloudsNight,
    video: fewCloudsVideo
  },
  // Scattered Clouds
  '03': {
    dayImage: fewClouds,
    nightImage: fewCloudsNight,
    video: scatteredCloudsVideo
  },
  // Broken Clouds
  '04': {
    dayImage: brokenClouds,
    nightImage: brokenCloudsNight,
    video: brokenCloudsVideo
  },
  // Shower Rain'
  '09': {
    dayImage: showerRain,
    nightImage: showerRainNight,
    video: rainVideo
  },
  // Rain
  '10': {
    dayImage: rain,
    nightImage: rainNight,
    video: rainVideo
  },
  // Thunderstorm
  '11': {
    dayImage: thunderstorm,
    nightImage: thunderstormNight,
    video: thunderstormVideo
  },
  // Snow
  '13': {
    dayImage: snow,
    nightImage: snowNight,
    video: snowVideo
  },
  // Mist
  '50': {
    dayImage: mist,
    nightImage: mistNight,
    video: mistVideo
  }
};

const getWeatherDescription = (weather) => {
  let id = weather.weather[0].icon;
  id = id.slice(0, -1);
  return weatherDescription[id];
}


const displayData = (location, weather, unit) => {
  // Display City
  const city = document.getElementById("city");
  city.textContent = `${location.name},`;

  // Display Country
  const country = document.getElementById("country");
  country.textContent = location.country;

  // Display City Date
  const date = document.getElementById("date");
  date.textContent = dateFunction.getLocalDate(weather.timezone).date;

  // Display City Day
  const day = document.getElementById("day");
  day.textContent = `${dateFunction.getLocalDate(weather.timezone).day},`;

  // Display City Time
  const time = document.getElementById("time");
  time.textContent = dateFunction.getLocalDate(weather.timezone).time;

  // Display Weather Description
  const description = document.getElementById("description");
  description.textContent = helperFunctions.capitaliseWords(weather.weather[0].description);

  // Display Weather Icon and Background
  const weatherInfo = getWeatherDescription(weather);
  const weatherIcon = document.getElementById("weather-icon");
  const weatherBgContainer = document.querySelector(".video-bg");
  weatherBgContainer.textContent = "";
  const weatherBg = document.createElement("source");
  weatherBg.setAttribute("type", "video/mp4");

  if (dateFunction.getLocalDate(weather.timezone).dayTime) {
    weatherIcon.src = weatherInfo.dayImage;
    weatherBg.src = weatherInfo.video;
    if (description.textContent === "Broken Clouds") {
      weatherBg.src = "../src/assets/background/few_clouds.mp4";
    }
  } else {
    weatherIcon.src = weatherInfo.nightImage;
    weatherBg.src = "../src/assets/background/night.mp4";
  }

  weatherBgContainer.appendChild(weatherBg);
  weatherBgContainer.load();

  // Display City Temperature
  const temp = document.getElementById("temp");
  temp.textContent = Math.round(weather.main.temp);

  // Display Windspeed
  const windSpeed = document.getElementById("wind-speed");
  const windSpeedIcon = document.getElementById("wind-speed-arrow");
  windSpeedIcon.style.transform = `rotate(${weather.wind.deg}deg)`;

  const windSpeedUnit = unit === "imperial" ? "mph" : "m/s";
  windSpeed.textContent = `${Math.round(weather.wind.speed)} ${windSpeedUnit}`;

  // Display Humidity
  const humidity = document.getElementById("humidity");
  humidity.textContent = `${weather.main.humidity}%`;

  // Display Sunrise and Sunset
  const sunrise = document.getElementById("sunrise");
  const sunriseImage = document.getElementById("sunrise-icon");
  sunrise.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunrise).time}`;
  sunriseImage.src = sunriseIcon;
  const sunset = document.getElementById("sunset");
  const sunsetImage = document.getElementById("sunset-icon");
  sunset.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunset).time}`;
  sunsetImage.src = sunsetIcon;
}

const createCard = (forecast, unit, i, timezone) => {
  // Create Card Div
  const card = document.createElement("div");
  card.setAttribute("class", "forecast-card");

  // Create and Display Time
  const time = document.createElement("h3");
  time.setAttribute("class", "forecast-time");

  if (i === 0) {
    time.textContent = "Now"
  } else {
    time.textContent = `${dateFunction.formatTime(timezone, forecast.hourly[i].dt).time}`
  }

  // Create and Display Weather Icon
  const icon = document.createElement("img");
  icon.setAttribute("class", "forecast-icon");
  icon.alt = "Weather Icon";

  if (dateFunction.formatTime(timezone, forecast.hourly[i].dt).dayTime) {
    icon.src = getWeatherDescription(forecast.hourly[i]).dayImage;
  } else {
    icon.src = getWeatherDescription(forecast.hourly[i]).nightImage;
  }

  // Create and Display Temperature
  const temperature = document.createElement("h3");
  temperature.setAttribute("class", "forecast-temp");

  if (unit === "imperial") {
    temperature.textContent = `${Math.round(forecast.hourly[i].temp)} °F`
  } else if (unit === "metric") {
    temperature.textContent = `${Math.round(forecast.hourly[i].temp)} °C`
  }

  if (i === 0) {
    const todayIcon = document.getElementById("weather-icon");
    const todayTemp = document.getElementById("temp");
    const todayUnit = unit === "imperial" ? "°F" : "°C";
    icon.src = todayIcon.src;
    temperature.textContent = `${todayTemp.textContent} ${todayUnit}`;
  }

  card.append(time, icon, temperature)

  return card;
}


const displayForecast = (forecast, unit, weather) => {
  const container = document.querySelector(".forecast-cards-container");
  container.textContent = "";

  for (let i = 0; i < 8; i += 1) {
    container.append(createCard(forecast, unit, i, weather.timezone));
  }

  // Display Min and Max Temp
  const forecastTemp = document.querySelectorAll(".forecast-temp");
  const forecastArray = [];
  forecastTemp.forEach(temp => {
    let temperature = temp.textContent;
    temperature = temperature.slice(0, -3);
    forecastArray.push(temperature);
  });

  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const todayUnit = unit === "imperial" ? "°F" : "°C";
  maxTemp.textContent = `${Math.max(...forecastArray)} ${todayUnit}`;
  minTemp.textContent = `${Math.min(...forecastArray)} ${todayUnit}`;

  // Change Forecast cards to White
  const cards = document.querySelectorAll(".forecast-cards-container div");
  const changeCardsWhite = () => {
    cards.forEach(card => {
      card.classList.add("light"); // eslint-disable-line no-param-reassign
    })
  }

  // Change cards if NightTime
  if (!dateFunction.getLocalDate(weather.timezone).dayTime) {
    changeCardsWhite();
  }

  // Change cards based on weather description
  switch (getWeatherDescription(weather)) {
    // Shower Rain
    case weatherDescription["09"]:
      changeCardsWhite();
      break;
      // Rain
    case weatherDescription["10"]:
      changeCardsWhite();
      break;
      // Thunderstorm
    case weatherDescription["11"]:
      changeCardsWhite();
      break;
      // Snow
    case weatherDescription["13"]:
      changeCardsWhite();
      break;


    default:
  }

}

const displayError = (input) => {
  const errorContainer = document.querySelector(".error-container");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = `Could not find ${input}`;
  errorContainer.classList.add("active");

  const inputField = document.getElementById("city-search");
  setTimeout(() => {
    errorContainer.classList.remove("active");
  }, 2500);

  if (inputField) {
    inputField.addEventListener("click", () => {
      errorContainer.classList.remove("active");
    })
  }

}

export {
  displayData,
  displayForecast,
  displayError
}