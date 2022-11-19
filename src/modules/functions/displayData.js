import dateFunction from "./dateConversion";
import helperFunctions from './helperFunctions';

const weatherDescription = {
  // Clear Sky
  '01': {
    image: "../src/assets/icons/clear_sky",
    video: "../src/assets/background/clear_sky.mp4"
  },
  // Few Clouds
  '02': {
    image: "../src/assets/icons/few_clouds",
    video: "../src/assets/background/few_clouds.mp4"
  },
  // Scattered Clouds
  '03': {
    image: "../src/assets/icons/few_clouds",
    video: "../src/assets/background/scattered_clouds.mp4"
  },
  // Broken Clouds
  '04': {
    image: "../src/assets/icons/overcast_clouds",
    video: "../src/assets/background/overcast_clouds.mp4"
  },
  // Shower Rain'
  '09': {
    image: "../src/assets/icons/shower_rain",
    video: "../src/assets/background/rain.mp4"
  },
  // Rain
  '10': {
    image: "../src/assets/icons/rain",
    video: "../src/assets/background/rain.mp4"
  },
  // Thunderstorm
  '11': {
    image: "../src/assets/icons/thunderstorm",
    video: "../src/assets/background/thunderstorm.mp4"
  },
  // Snow
  '13': {
    image: "../src/assets/icons/snow",
    video: "../src/assets/background/snow.mp4"

  },
  // Mist
  '50': {
    image: "../src/assets/icons/mist",
    video: "../src/assets/background/mist.mp4"
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
    weatherIcon.src = `${weatherInfo.image}.png`;
    weatherBg.src = weatherInfo.video;
    if (description.textContent === "Broken Clouds") {
      weatherBg.src = "../src/assets/background/few_clouds.mp4";
    }
  } else {
    weatherIcon.src = `${weatherInfo.image}_night.png`;
    weatherBg.src = "../src/assets/background/night.mp4";
  }

  weatherBgContainer.appendChild(weatherBg);
  weatherBgContainer.load();

  // Display City Temperature
  const temp = document.getElementById("temp");
  temp.textContent = Math.round(weather.main.temp);

  // Display High, Low and Windspeed
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

  // Display Humidity
  const humidity = document.getElementById("humidity");
  humidity.textContent = `${weather.main.humidity}%`;

  // Display Sunrise and Sunset
  const sunrise = document.getElementById("sunrise");
  sunrise.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunrise).time}`;
  const sunset = document.getElementById("sunset");
  sunset.textContent = `${dateFunction.formatTime(weather.timezone, weather.sys.sunset).time}`;
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
    icon.src = `${getWeatherDescription(forecast.hourly[i]).image}.png`;
  } else {
    icon.src = `${getWeatherDescription(forecast.hourly[i]).image}_night.png`;
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

  for (let i = 0; i < 7; i += 1) {
    container.append(createCard(forecast, unit, i, weather.timezone));
  }


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

export {
  displayData,
  displayForecast
}