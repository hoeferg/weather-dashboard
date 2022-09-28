// Form section

const cityText = document.querySelector("#city-text")
const cityList = document.querySelector("#city-list")
const cityForm = document.querySelector("#city-form");


const cityWeather = document.querySelector("#city-weather")
// const date = moment().format('L')
const fetchButton = document.querySelector(".fetch-button");
let cityName = document.querySelector("#city-name")
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
            for (var i = 0; i < data.length; i++) {
                //Creating a h3 element and a p element
                let cityName = document.createElement('h3');
                let temp = document.createElement('p1');
                let hum = document.createElement('p2');
                let wind = document.createElement('p3');


                //Setting the text of the h3 element and p element.
                
                cityName.textContent = data.name;
                temp.textContent = data.main.temp;
                hum.textContent = data.main.humidity;
                wind.textContent = data.wind.speed;

                //Append will attach the element as the bottom most child.
                usersContainer.append(cityName);
                usersContainer.append(temp);
                usersContainer.append(hum);
                usersContainer.append(wind);
            }
        });
}
fetchButton.addEventListener('click', getApi);



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
// let future = document.querySelector("#future")
// function futureW() {
//     let requestUrl = 'const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=09515eadd9b3171770ca63a546779557`;';

//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         // This returns the info and condenses it into an array with json
//         .then(function (data) {
//             //Using console.log to examine the data
//             console.log(data);
//             for (var i = 1; i < 6; i++) {
//                 //Creating a h3 element and a p element
//                 for (var i = 0; i < data.length; i++) {
//                     //Creating a h3 element and a p element
//                     let fDate = document.createElement('h4');
//                     let fTemp = document.createElement('p5');
//                     let fHum = document.createElement('p6');
                    


//                     //Setting the text of the h3 element and p element.
//                     fDate.textContent = data[i].dt;
//                     fTemp.textContent = data[i].temperature;
//                     fHum.textContent = data[i].humidity;

//                     //Appending the dynamically generated html to the div associated with the id="users"
//                     //Append will attach the element as the bottom most child.
//                     usersContainer.append(fDate);
//                     usersContainer.append(fTemp);
//                     usersContainer.append(fHum);

//                     future = document.createElement(future)
//                 }
//             })
// }
