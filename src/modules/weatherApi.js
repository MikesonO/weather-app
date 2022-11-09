import conversion from "./tempConversion";

const apiKey = "3c6d04ecb7b45ddcda56c7eca816cb5f";

/* Async Function fetching API */
const getWeather = async () => {
  try {
    const inputResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${"london"}&limit=5&appid=${apiKey}`, {
      mode: 'cors'
    });

    // Fetch Location
    const locationData = await inputResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apiKey}`);

    // Fetch Weather Data for Location
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    const {
      temp,
    } = weatherData.main;

    const celsius = conversion.kelvinToCelsius(temp);
    const fahrenheit = conversion.kelvinToFahrenheit(temp);

    console.log(`celsius ${celsius}`);
    console.log(conversion.toCelsius(fahrenheit));
    console.log(`fahrenheit ${fahrenheit}`);
    console.log(conversion.toFahrenheit(celsius));


  } catch (error) {
    console.log(error);
  }

}

export default getWeather;