const icon = document.querySelector(".weather-icon"),
    temperature = document.querySelector(".weather-temperature"),
    description = document.querySelector(".weather-description"),
    windSpeed = document.querySelector(".weather-speed"),
    humidity = document.querySelector(".weather-humidity"),
    city = document.querySelector(".city");


async function getWeather() {
    if (city.textContent === "") {

        city.textContent = localStorage.getItem("city");
        city.blur();
        return;

    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=c8246f36528652a84a4fe4b3e053db27&units=metric`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 404 || data.cod === 401) {

        temperature.textContent = ``;
        windSpeed.textContent = ``;
        humidity.textContent = ``;
        description.textContent = `${data.message}`;

    }

    icon.className = "weather-icon owf"
    icon.classList.add(`owf-${data.weather[0].id}`);
    icon.classList.add(`owf-5x`);
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = `${data.weather[0].description}`;
    windSpeed.textContent = `${data.wind.speed}m/s`;
    humidity.textContent = `${data.main.humidity}%`;

    if (data.weather[0].main === "Clear") {

        icon.style.color = "#efff00";

    } else {

        icon.style.color = "";

    }

}

function setCity(e) {

    if (e.code === "Enter") {

        getWeather();
        city.blur()

    }

}


function getCity() {

    localStorage.setItem("city", city.textContent);

}

function pasteCity() {

    if (localStorage.getItem("city") === null || localStorage.getItem("city") === "") {

        city.textContent = "Enter a City";

    } else {

        city.textContent = localStorage.getItem("city");

    }

}

document.addEventListener("DOMContentLoaded", () => {
    pasteCity();
    getWeather();

});
city.addEventListener("keypress", (e) => {

    setCity(e);
    getCity();

});