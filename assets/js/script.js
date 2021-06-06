
var searchBtn = document.querySelector("#search-flight");
var departFrom = document.querySelector("#depart");
var destination = document.querySelector("#arrival");
var departDate = document.querySelector("#departure-date");



searchBtn.addEventListener("click", saveFlight);

function saveFlight(event) {

    event.preventDefault();

    console.log(departFrom, destination, departDate);

    if(departDate.value === "" || departDate.value === null || destination.value === "" || destination.value === null || departFrom.value === "" || departFrom.value === null) {
        alert("Please fill out all fields");
        location = "./index.html";
    } else {

    localStorage.setItem("departFromLS", departFrom.value);

    localStorage.setItem("destinationLS", destination.value);

    localStorage.setItem("departDateLS", departDate.value);

    console.log(departFrom.value, destination.value, departDate.value);

    location = "./bookFlight.html";
    };
}