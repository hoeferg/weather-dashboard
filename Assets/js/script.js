const cityInput = document.querySelector("#cityInput")
const cityList = document.querySelector("#city-list")
const cityForm = document.querySelector("#city-form");

const cities = [];
// Creates cities in list

function renderCities() {
    // clears the cityInput element
    cityInput.innerHTML = "";
    


    // create a new li for each city entry
    for (var i = 0; i < cities.length; i++) {
        let city = cities[i];

        let li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i)
        cityList.appendChild(li);
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

    let cityText = cityInput.value.trim();

    // Return from function early if submitted cityText is blank
    if (cityText === "") {
        return;
    }

    // Add new cityText to cities array, clear the input
    cities.push(cityText);
    cityInput.value = "";

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
        renderCites();
    }
});

// Calls init to retrieve data and render it to the page on load
init()