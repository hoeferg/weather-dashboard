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
    cityList.innerHTML = "";

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
cityForm.addEventListener("submit", function (event) {
    event.preventDefault()
    let city = cityText.value
    // Checks if element is a button
    // Store updated cities in localStorage, re-render the list
    console.log(city)
    cities.push(city)
    renderCities()
    storeCities()
    console.log(cities)
})

// Calls init to retrieve data and render it to the page on load
init()

// fetch section
function getApi(city) {
    let cityName = cityText.value
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName || city}&appid=09515eadd9b3171770ca63a546779557&units=imperial`
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
            let time = data.dt
            let dateTime = new Date(time*1000).toLocaleDateString("en-us")
        
            console.log(dateTime)
            console.log(data.name)
            date.textContent = dateTime;
            $cityName.textContent = data.name;
            temp.textContent = "Temp: "+data.main.temp + "degrees";
            hum.textContent = "Humidity: "+data.main.humidity + "%";
            wind.textContent = "Wind Speed: "+data.wind.speed + "MPH";

        })
}

function geoApi(city) {
    let cityName = cityText.value
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName || city}&limit=1&appid=09515eadd9b3171770ca63a546779557`

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
cityForm.addEventListener('submit', function (event) {
    event.preventDefault();
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
                let cardBody = document.createElement("div")
                card.setAttribute("class", "card col-lg-1")
                cardBody.setAttribute("class", "card-body")
                let p_dt = document.createElement("p")
                let p_temp = document.createElement("p")
                let p_humidity = document.createElement("p")
                let p_wind = document.createElement("p")

                p_dt.setAttribute("class", "p-text")

                p_dt.textContent = `date: ${dt}`
                p_temp.textContent = `temp: ${temp}`
                p_humidity.textContent = `humidity: ${humidity}`
                p_wind.textContent = `wind: ${wind}`

                cardBody.appendChild(p_dt)
                cardBody.appendChild(p_temp)
                cardBody.appendChild(p_humidity)
                cardBody.appendChild(p_wind)
                card.appendChild(cardBody)
                future.appendChild(card)
                
            }
        });
}