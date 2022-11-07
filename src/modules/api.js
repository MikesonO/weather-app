const apiKey = "3c6d04ecb7b45ddcda56c7eca816cb5f";

/* Async Function fetching API */
const getWeather = async () => {
  try {
    const inputResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${"london"}&limit=5&appid=${apiKey}`, {
      mode: 'cors'
    });

    const weatherData = await inputResponse.json();
    console.log(weatherData[0]);

  } catch (error) {
    console.log(error);
  }

}

export default getWeather;