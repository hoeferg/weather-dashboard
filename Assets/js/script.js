// Form section

const cityText = document.querySelector("#city-text")
const cityList = document.querySelector("#city-list")
const cityForm = document.querySelector("#city-form");
const date = document.querySelector("#date")
const cityWeather = document.querySelector("#city-weather")
const fetchButton = document.querySelector(".fetch-button");
let $cityName = document.querySelector("#city-name")
let temp = document.querySelector("#temp")
let hum = document.querySelector("#humidity")
let wind = document.querySelector("#wind")
let uv = document.querySelector("#UV")
let future = document.querySelector("#future")
let cities = [];
// Creates cities in list

function renderCities() {
    // clears the cityInput element
    cityText.innerHTML = "";

    // create a new li for each city entry
    for (var i = 0; i < cities.length; i++) {
        let city = cities[i];

        let btn = document.createElement("button");
        btn.textContent = city;

        btn.setAttribute("data-value", city)
        btn.addEventListener("click", historySearch)
        cityList.appendChild(btn);
    }
}

function historySearch() {
console.log(this.dataset.value)
getApi(this.dataset.value)
geoApi(this.dataset.value)

}

// The function  will run when the page loads.
function init() {
    // Get stored cities from localStorage
    let storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cites array to it
    if (storedCities !== null) {
        cities = storedCities;
    }

    // This is a helper function that will render cities to the DOM
    renderCities();
}

function storeCities() {
    // Stringify and set key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
}

// Add click event to cityList element
cityList.addEventListener("click", function (event) {
    let element = event.target;

    // Checks if element is a button
    if (element.matches("button") === true) {
        // Get its data-index value and remove the city element from the list
        var index = element.parentElement.getAttribute("data-index");
        cities.splice(index, 1);

        // Store updated cities in localStorage, re-render the list
        storeCities();
        renderCities();
    }
})

// Calls init to retrieve data and render it to the page on load
init()

// fetch section
function getApi(city) {
    let cityName = cityText.value
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName||city}&appid=09515eadd9b3171770ca63a546779557&units=imperial`
    console.log(cityName)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        // This returns the info and condenses it into an array with json
        .then(function (data) {
            //Using console.log to examine the data
            console.log(data);

            //Setting the text of the h3 element and p element.
            console.log(data.name)
            date.textContent = data.dt;
            $cityName.textContent = data.name;
            temp.textContent = data.main.temp + "degrees";
            hum.textContent = data.main.humidity + "%";
            wind.textContent = data.wind.speed + "MPH";

        })
}

function geoApi(city) {
    let cityName = cityText.value
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName||city}&limit=1&appid=09515eadd9b3171770ca63a546779557`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        // This returns the info and condenses it into an array with json
        .then(function (data) {
            //Using console.log to examine the data
            console.log(data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            console.log(lat)
            getWeather(lat, lon)
        });
}
fetchButton.addEventListener('click', function () {
    getApi();
    geoApi();
})
console.log(geoApi)

// 5 day forecast
function getWeather(latitude, longitude) {
    console.log(longitude, latitude)
    cityName = cityText.value
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=09515eadd9b3171770ca63a546779557&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        // This returns the info and condenses it into an array with json
        .then(function (data) {
            //Using console.log to examine the data
            console.log(data);
            for (let i = 1; i < data.list.length; i += 8) {
                console.log(data.list[i])
                let dt = data.list[i].dt_txt;
                let temp = data.list[i].main.temp;
                let humidity = data.list[i].main.humidity;
                let wind = data.list[i].wind.speed;

                let card = document.createElement("div")
                card.setAttribute("class", "card col")
                let p_dt = document.createElement("p")
                let p_temp = document.createElement("p")
                let p_humidity = document.createElement("p")
                let p_wind = document.createElement("p")
                
                p_dt.textContent = `date: ${dt}`
                p_temp.textContent = `temp: ${temp}`
                p_humidity.textContent = `humidity: ${humidity}`
                p_wind.textContent = `wind: ${wind}`

                card.appendChild(p_dt)
                card.appendChild(p_temp)
                card.appendChild(p_humidity)
                card.appendChild(p_wind)
                future.appendChild(card)
            }
        });
}