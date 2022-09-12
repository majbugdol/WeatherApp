let dataObj = {};
let cityName = "";
const searchBtn = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");
const weatherInCity = document.querySelector(".weather-city");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".weather-temperature");
const weatherDescription = document.querySelector(".weather-description");
const humidity = document.querySelector(".weather-humidity");
const windSpeed = document.querySelector(".weather-wind");
const weatherInformation = document.querySelector(".weather");
const pressure = document.querySelector(".weather-pressure");

const getWeather = async function () {
  await fetch(`https://app-mc-1.herokuapp.com/api/city?q=${cityName}`)
    .then((response) => response.json())
    .then((data) => (dataObj = data.results));
};

const displayWeather = async function (e) {
  e.preventDefault();
  cityName = searchBar.value;
  await getWeather();

  if (dataObj.message === "city not found") {
    alert("City not found - please input correct city.");
    searchBar.value = "";
  } else {
    console.log(dataObj);
    weatherInformation.style.display = "block";
    weatherInCity.textContent = `${cityName}:`;
    temp.textContent = `${(dataObj.main.temp - 272.15).toFixed(1)}°C`;
    weatherIcon.src =
      "https://openweathermap.org/img/wn/" + dataObj.weather[0].icon + ".png";
    weatherDescription.textContent = dataObj.weather[0].description;
    humidity.textContent = `Humidity: ${dataObj.main.humidity}%`;
    windSpeed.textContent = `Wind speed: ${dataObj.wind.speed}m/s`;
    pressure.textContent = `Air pressure: ${dataObj.main.pressure}hPa`;
    searchBar.value = "";
  }
};

searchBtn.addEventListener("click", displayWeather);
