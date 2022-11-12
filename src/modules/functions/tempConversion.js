const conversion = (() => {

  const kelvinToCelsius = (kelvin) => {
    const temp = Math.round(kelvin - 273.15);
    return temp;
  }

  const kelvinToFahrenheit = (kelvin) => {
    const temp = Math.round(((kelvin - 273.15) * (9 / 5)) + 32);
    return temp;
  }

  const toCelsius = (fahrenheit) => {
    let temp = parseFloat(fahrenheit);
    temp = Math.round((temp - 32) * (5 / 9));
    return temp;
  }

  const toFahrenheit = (celsius) => {
    let temp = parseFloat(celsius);
    temp = Math.round((temp * (9 / 5)) + 32);
    return temp;

  }


  return {
    kelvinToCelsius,
    kelvinToFahrenheit,
    toCelsius,
    toFahrenheit
  }

})();

export default conversion;