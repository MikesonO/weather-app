import {
  displayData,
  displayForecast
} from './displayData';

const apiKey = process.env.API_KEY;

/* Async Function fetching API */
const getWeather = async (input) => {
  try {

    const selectedUnit = document.getElementById('temp-unit');
    let unit = '';

    if (selectedUnit.classList.contains('imperial')) {
      unit = 'imperial';
    } else if (selectedUnit.classList.contains('metric')) {
      unit = 'metric';
    }

    const inputResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`, {
      mode: 'cors'
    });

    // Fetch Location
    const locationData = await inputResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=${unit}&appid=${apiKey}`);

    // Fetch Weather Data for Location
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    displayData(locationData[0], weatherData, unit);

    const forecastReponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=current,minutely,alerts&units=${unit}&appid=${process.env.API_KEY2}`
    );

    const forecastData = await forecastReponse.json();

    console.log(forecastData);

    displayForecast(forecastData, unit, weatherData.timezone);

  } catch (error) {
    console.log(error);
  }

}

export default getWeather;