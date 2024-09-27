const inputbox = document.querySelector(".input-box");
const btn = document.querySelector("#searchBtn");
const img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const desc = document.querySelector(".description");
const humi = document.querySelector("#humidity");
const wind = document.querySelector("#wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");


async function checkWeather(city) {
    const apiKey = "125cdd91cda46261f54dc4044ed41538";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`)
        .then(resp => resp.json());
    console.log(weatherData);

    if (weatherData.cod === "404") {

        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error")
        return;
    }
    // console.log("run");
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    desc.innerHTML = `${weatherData.weather[0].description}`;
    humi.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed}Km/H`;

    switch (weatherData.weather[0].main) {
        case 'clouds':
            img.src = "assets/cloud.png";
            break;
        case 'clear':
            img.src = "assets/clear.png";
        case 'Rain':
            img.src = "assets/rain.png";
            break;
        case 'Mist':
            img.src = "assets/mist.png";
            break;
        case 'Snow':
            img.src = "assets/snow.png";
            break;
    }
    console.log(weatherData);
}


btn.addEventListener("click", () => {
    checkWeather(inputbox.value);
})
