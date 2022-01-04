//Open Weather map Api
const apiKey = "YOUR_API_KEY";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// elements
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("search");
const cityAndCountry = document.getElementById("cityAndCountry");
const temperature = document.getElementById("temperature");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");

// Add event listener to search button
searchBtn.addEventListener("click", () => {
  getWeatherByCity(input.value);
});

// Display weather data
const displayWeatherData = (data) => {
  cityAndCountry.innerText = `${data.city}, ${data.country}`;
  temperature.innerText = `${data.temp}°C`;
  pressure.innerText = `${data.pressure} hPa`;
  humidity.innerText = `${data.humidity}%`;
};

window.onload = () => {
  getUserLocation();
};

// Get weather data by city name
const getWeatherByCity = async (city) => {
  axios
    .get(baseUrl + `?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      displayWeatherData({
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      console.log("Always Executed");
    });
};

// Get weather data by geo location coordinates
const getWeatherDataByCoordinates = (lat, lon) => {
  axios
    .get(baseUrl + `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => {
        displayWeatherData({
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
          });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {});
};

// Get current user location
const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    getWeatherDataByCoordinates(
      position.coords.latitude,
      position.coords.longitude
    );
  });
};
