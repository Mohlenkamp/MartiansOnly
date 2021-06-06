var SpaceXbtn = document.querySelector("#SpaceXbtn");
var NASAbtn = document.querySelector("#NASAbtn");
var bookSpaceX = document.querySelector("#bookSpaceX");
var bookNASA = document.querySelector("#bookNASA");
var returnBtn = document.querySelector("#return");
var returnMain = document.querySelector("#return-main");
var SpaceX = document.querySelector("#SpaceX");
var NASA = document.querySelector("#NASA");
var timeSpaceX = document.querySelector("#timeSpaceX");
var timeNASA = document.querySelector("#timeNASA");
var bookFlight = document.querySelector("#book-flight");
var passengerInput = document.querySelector("#submit-form");
var ticketResult = document.querySelector("#marsticket");
var departFrom = document.querySelector("#departure-option");
var destination = document.querySelector("#destination");
var departDate = document.querySelector("#dateSelector");
var priceSpaceX = document.querySelector("#priceSpaceX");
var priceNASA = document.querySelector("#priceNASA");
var firstNameInput = document.querySelector("#first-name");
var lastNameInput = document.querySelector("#last-name");
var from = localStorage.getItem("departFromLS");
var toward = localStorage.getItem("destinationLS");
var dateInput = localStorage.getItem("departDateLS");
var ticketDate = document.querySelector("#ticket-date");
var ticketFrom = document.querySelector("#ticket-from");
var ticketToward = document.querySelector("#ticket-toward");
var ticketLast = document.querySelector("#ticket-last-name");
var ticketFirst = document.querySelector("#ticket-first-name");
var ticketAirline = document.querySelector("#ticket-airline");
var ticketTime = document.querySelector("#ticket-time");
var ticketPrice = document.querySelector("#ticket-price");
var flightTable = document.querySelector("#flight-table");
var marsWeather = document.querySelector("#my-info");


console.log(from, toward, dateInput);


function priceGen() {
    var priceOne = Math.floor(Math.random() * 100000 + 100000)

    priceSpaceX.innerHTML = "$" + priceOne

    var priceTwo = Math.floor(Math.random() * 100000 + 100000)

    priceNASA.innerHTML = "$" + priceTwo
    
};

function choseSpaceX(event) {

    event.preventDefault();
    flightTable.classList.add("hide");
    passengerInput.classList.remove("hide");

   // ticketAirline.innerHTML = SpaceX.innerHTML
    // ticketPrice.innerHTML = priceSpaceX.innerHTML
    ticketTime.innerHTML = timeSpaceX.innerHTML
};

function choseNASA(event) {

    event.preventDefault();
    flightTable.classList.add("hide");
    passengerInput.classList.remove("hide");

  //  ticketAirline.innerHTML = NASA.innerHTML
  //  ticketPrice.innerHTML = priceNASA.innerHTML
    ticketTime.innerHTML = timeNASA.innerHTML
};


function ticketGen(event) {

    event.preventDefault();


    if(lastNameInput.value === "" || lastNameInput.value === null || firstNameInput.value === "" || firstNameInput.value === null) {
        alert("Please fill out all fields");
        return;
    } else {

        passengerInput.classList.add("hide");
        flightTable.classList.add("hide");

        ticketDate.innerHTML = dateInput;
        ticketFrom.innerHTML = "From: " + from;
        ticketToward.innerHTML = "To: " + toward;
        ticketLast.innerHTML = lastNameInput.value;
        ticketFirst.innerHTML = firstNameInput.value;








        ticketResult.classList.remove("hide");
        marsWeather.classList.remove("hide");
    };
};

function returnBooking() {
    flightTable.classList.remove("hide");
    ticketResult.classList.add("hide");
    marsWeather.classList.add("hide");
};

function backToMain() {
    flightTable.classList.remove("hide");
    ticketResult.classList.add("hide");
    marsWeather.classList.add("hide");

    location = "./index.html";
};





















priceGen();
bookFlight.addEventListener("click", ticketGen);
SpaceXbtn.addEventListener("click", choseSpaceX);
NASAbtn.addEventListener("click", choseNASA);
returnBtn.addEventListener("click", returnBooking);
returnMain.addEventListener("click", backToMain);