import displayData from './displayData';

const apiKey = '3c6d04ecb7b45ddcda56c7eca816cb5f';

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

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apiKey}&units=${unit}`);

    // Fetch Weather Data for Location
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    displayData(locationData[0], weatherData);

    const {
      humidity
    } = weatherData.main;

    // Get Wind Speed
    console.log(`Wind Speed: ${Math.round(weatherData.wind.speed)
    } mph`);
    console.log(`Degree Angle: ${weatherData.wind.deg}°`);

    // Get Humidity
    console.log(`Humidity: ${humidity}%`);


  } catch (error) {
    console.log(error);
  }

}

export default getWeather;