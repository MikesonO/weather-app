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

  } catch (error) {
    console.log(error);
  }

}

export default getWeather;