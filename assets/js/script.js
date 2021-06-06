var searchBtn = document.querySelector("#search-flight");
var departFrom = document.querySelector("#depart");
var destination = document.querySelector("#arrival");
var departDate = document.querySelector("#departure-date");



function saveFlight(event) {

    event.preventDefault();

    console.log(departFrom, destination, departDate);

    let validDate = new Date(departDate)

    var dateTwo = new Date()
    console.log(dateTwo);

    if(departDate.value === "" || departDate.value === null || validDate < dateTwo) {
        departDate.value = dateTwo
    }
    if(destination.value === "" || destination.value === null) {
        destination.value = "Curiosity"
    }
    if(departFrom.value === "" || departFrom.value === null) {
        departFrom.value = "USA"
    }

    localStorage.setItem("departFromLS", departFrom.value);

    localStorage.setItem("destinationLS", destination.value);

    localStorage.setItem("departDateLS", departDate.value);

    console.log(departFrom.value, destination.value, departDate.value);

     location = "./bookFlight.html";
}


searchBtn.addEventListener("click", saveFlight);