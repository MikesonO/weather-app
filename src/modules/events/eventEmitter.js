import {
  getWeather,
  getLocation
} from "../functions/weatherApi";

export default function eventEmitter() {
  const searchBar = document.getElementById("city-search");
  const clearButton = document.querySelector("#clear-button");
  const searchButton = document.getElementById("search-button");
  const tempUnit = document.getElementById("temp-unit");
  const locationBtn = document.getElementById("location-button");

  // Displays clear button if value is not empty
  searchBar.addEventListener("keyup", () => {
    if (searchBar.value === "") {
      clearButton.classList.remove("active");
    } else {
      clearButton.classList.add("active");
    }
  })

  // Clears the Search Bar
  clearButton.addEventListener("click", () => {
    clearButton.classList.remove("active");
    searchBar.value = "";
    searchBar.select();
  })

  // Get User's Input
  searchButton.addEventListener("click", () => getWeather(searchBar.value));

  tempUnit.addEventListener("click", () => {
    const city = document.getElementById("city").innerText;
    console.log(city);
    if (tempUnit.classList.contains("metric")) {
      tempUnit.classList.remove("metric");
      tempUnit.classList.add("imperial");
      getWeather(city);
    } else if (tempUnit.classList.contains("imperial")) {
      tempUnit.classList.remove("imperial");
      tempUnit.classList.add("metric");
      getWeather(city);
    }
  });

  // Get User Location
  locationBtn.addEventListener("click", getLocation);

  // Get Weather when page is loaded
  getWeather("London");
}