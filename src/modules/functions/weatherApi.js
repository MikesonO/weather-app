import {
  displayData,
  displayForecast,
  displayError
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
    displayData(locationData[0], weatherData, unit);

    const forecastReponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=current,minutely,alerts&units=${unit}&appid=${process.env.API_KEY2}`
    );

    const forecastData = await forecastReponse.json();
    displayForecast(forecastData, unit, weatherData);

  } catch (error) {
    displayError(input);
  }

}

// Get User Location
const getLocation = () => {
  const success = async (position) => {
    const {
      latitude,
      longitude
    } = position.coords

    const fetchLocation = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`, {
      mode: 'cors'
    });

    const currentLocation = await fetchLocation.json();
    getWeather(currentLocation.city);
  }

  const error = () => {}

  navigator.geolocation.getCurrentPosition(success, error);
}

export {
  getWeather,
  getLocation
};