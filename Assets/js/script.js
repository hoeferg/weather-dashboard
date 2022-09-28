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

        btn.setAttribute("data-index", i)
        cityList.appendChild(btn);
    }
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

// Add submit event to form
cityForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let cityText = document.querySelector("#city-text")
    let cityName = cityText.value.trim();
    cityName = cityName.toLowerCase();

    // Return from function early if submitted cityText is blank
    if (cityName === "") {
        return;
    }

    // Add new cityText to cities array, clear the input
    cities.push(cityName);
    cityText.value = "";

    // Store updated cities in localStorage, re-render the list
    storeCities();
    renderCities();
});


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
});

// Calls init to retrieve data and render it to the page on load
init()











// fetch section


function getApi() {
    cityName = cityText.value
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=09515eadd9b3171770ca63a546779557`;
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
            date.textContent= data.dt;
            $cityName.textContent = data.name;
            temp.textContent = data.main.temp + "degrees kelvin";
            hum.textContent = data.main.humidity + "%";
            wind.textContent = data.wind.speed + "MPH";


            localStorage.setItem("date", (date.textContent))
            localStorage.setItem("cityName", (cityName.textContent));
            localStorage.setItem("temp", (temp.textContent));
            localStorage.setItem("hum", (hum.textContent));
            localStorage.setItem("wind", (wind.textContent));
            //Append will attach the element as the bottom most child.

        });
}



function geoApi() {
    cityName = cityText.value
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=09515eadd9b3171770ca63a546779557`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        // This returns the info and condenses it into an array with json
        .then(function (data) {
            //Using console.log to examine the data
            console.log(data);
            lat = data[0].lat
            log = data[0].lon

            getWeather(lat, log)


        });
}
fetchButton.addEventListener('click', function () {
    getApi();
    geoApi();
    getWeather();
});
// UV Fetch Section
// let uv = document.querySelector("#UV")


// function uvIndex() {
//     var requestUrl = 'https://api.openuv.io/api/v1/uv';

//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         // This returns the info and condenses it into an array with json
//         .then(function (data) {
//             //Using console.log to examine the data
//             console.log(data);
//             for (var i = 0; i < data.length; i++) {
//                 //Creating a h3 element and a p element
//                 let uv = document.createElement('p4');

//                 //Setting the text of the h3 element and p element.
//                 uv.textContent = data[i].uvIndex;

//                 //Appending the dynamically generated html to the div associated with the id="users"
//                 //Append will attach the element as the bottom most child.
//                 usersContainer.append(uv);

//                 if (uv >= 0 && uv <= 2) {
//                     uv.setAttribute("background-color", "#00D81D", "text", "black")
//                 } else if (uv >= 3 && uv <= 5) {
//                     uv.setAttribute("background-color", "#E6F52D", "text", "black")
//                 } else if (uv >= 6 && uv <= 7) {
//                     uv.setAttribute("background-color", "#F5912D", "text", "black")
//                 } else if (uv >= 8 && uv <= 10) {
//                     uv.setAttribute("background-color", "#F91616 ", "text", "black")
//                 }
//             }
//         }
//     }

// fetchButton.addEventListener('click', getApi);




// 5 day forecast
function getWeather(latitude, longitude) {
    cityName = cityText.value
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=09515eadd9b3171770ca63a546779557`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        // This returns the info and condenses it into an array with json
        .then(function (data) {
            //Using console.log to examine the data
            console.log(data);
            dateFOne.textContent= data.list[0].dt;
            tempFOne.textContent = data.list[0].main.temp
            humFOne.textContent = data.list[0].main.humidity
            windFOne.textContent = data.list[0].wind.speed

            dateFTwo.textContent= data.list[8].dt;
            tempFTwo.textContent = data.list[8].main.temp
            humFTwo.textContent = data.list[8].main.humidity
            windFTwo.textContent = data.list[8].wind.speed

            dateFThree.textContent= data.list[16].dt;
            tempFThree.textContent = data.list[16].main.temp
            humFThree.textContent = data.list[16].main.humidity
            windFThree.textContent = data.list[16].wind.speed

            dateFFour.textContent= data.list[24].dt;
            tempFFour.textContent = data.list[24].main.temp
            humFFour.textContent = data.list[24].main.humidity
            windFFour.textContent = data.list[24].wind.speed

            dateFFive.textContent= data.list[32].dt;
            tempFFive.textContent = data.list[32].main.temp
            humFFive.textContent = data.list[32].main.humidity
            windFFive.textContent = data.list[32].wind.speed
            //Setting the text of the h3 element and p element.

            localStorage.setItem('tempFOne', (tempFOne.textContent));
            localStorage.setItem('humFOne', (humFOne.textContent));
            localStorage.setItem('windFOne', (windFOne.textContent));

            localStorage.setItem('tempFTwo', (tempFTwo.textContent));
            localStorage.setItem('humFTwo', (humFTwo.textContent));
            localStorage.setItem('windFTwo', (windFTwo.textContent));

            localStorage.setItem('tempFThree', (tempFThree.textContent));
            localStorage.setItem('humFThree', (humFThree.textContent));
            localStorage.setItem('windFThree', (windFThree.textContent));

            localStorage.setItem('tempFFour', (tempFFour.textContent));
            localStorage.setItem('humFFour', (humFFour.textContent));
            localStorage.setItem('windFFour', (windFFour.textContent));

            localStorage.setItem('tempFFive', (tempFFive.textContent));
            localStorage.setItem('humFFive', (humFFive.textContent));
            localStorage.setItem('windFFive', (windFFive.textContent));

            //Append will attach the element as the bottom most child.

        });
}