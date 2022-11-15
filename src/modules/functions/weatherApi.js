import conversion from './tempConversion';
import helperFunctions from './helperFunctions';
import displayData from './displayData';

const apiKey = '3c6d04ecb7b45ddcda56c7eca816cb5f';

/* Async Function fetching API */
const getWeather = async (input) => {
  try {
    const inputResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`, {
      mode: 'cors'
    });

    // Fetch Location
    const locationData = await inputResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apiKey}`);

    // Fetch Weather Data for Location
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    displayData(locationData[0], weatherData);

    const {
      temp,
      humidity
    } = weatherData.main;

    const celsius = conversion.kelvinToCelsius(temp);
    const fahrenheit = conversion.kelvinToFahrenheit(temp);

    // Get Temperature
    console.log(`celsius ${celsius}`);
    console.log(conversion.toCelsius(fahrenheit));
    console.log(`fahrenheit ${fahrenheit}`);
    console.log(conversion.toFahrenheit(celsius));

    // Get Weather
    console.log(helperFunctions.capitaliseWords(weatherData.weather[0].description));

    // Get Wind Speed
    console.log(`Wind Speed: ${Math.round(weatherData.wind.speed *  2.237)
    } km/h`);
    console.log(`Degree Angle: ${weatherData.wind.deg}°`);

    // Get Humidity
    console.log(`Humidity: ${humidity}%`);


  } catch (error) {
    console.log(error);
  }

}

export default getWeather;