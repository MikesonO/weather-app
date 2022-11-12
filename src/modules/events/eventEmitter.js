import getWeather from "../functions/weatherApi";

export default function eventEmitter() {
  const searchBar = document.getElementById("city");
  const clearButton = document.querySelector("#clear-button");
  const searchButton = document.getElementById("search-button");

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
  })

  // Get User's Input
  searchButton.addEventListener("click", () => getWeather(searchBar.value));
}