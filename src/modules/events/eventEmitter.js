export default function eventEmitter() {
  const searchBar = document.getElementById("city");
  const clearButton = document.querySelector("#clear-button");

  // Displays clear button if value is not empty
  searchBar.addEventListener("keyup", () => {
    if (searchBar.value === "") {
      console.log(searchBar.value)
      clearButton.classList.remove("active");
    } else {
      console.log(searchBar.value)
      clearButton.classList.add("active");
    }
  })

  // Clears the Search Bar
  clearButton.addEventListener("click", () => {
    clearButton.classList.remove("active");
    searchBar.value = "";
  })


}