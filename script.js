//Open Weather map Api
const apiKey = "Your API Key";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// elements
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("search");
const message = document.getElementById("message");
const cityAndCountry = document.getElementById("cityAndCountry");
const temperature = document.getElementById("temperature");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");

// Add event listener to search button
searchBtn.addEventListener("click", () => {
  getWeatherByCity(input.value);
});

// Show loading message
const showLoading = (show) => {
    if(show)
    {
        message.style.display = "block";
        message.style.color = "green";
        message.innerText = "Loading...";
    }
    else{
        message.style.display = "none";
    }
}

// Show Error message
const showError = (error) => {
    message.style.display = "block";
    message.style.color = "red";
    message.innerText = `Something went wrong: ${error}`;
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}

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
    showLoading(true);
  axios
    .get(baseUrl + `?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
        showLoading(false);
      displayWeatherData({
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
      });
    })
    .catch((error) => {
      showError(error.response.data.message);
    })
    .then(() => {
      console.log("Always Executed");
    });
};

// Get weather data by geo location coordinates
const getWeatherDataByCoordinates = (lat, lon) => {
    showLoading(true);
  axios
    .get(baseUrl + `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => {
        showLoading(false);
        displayWeatherData({
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
          });
    })
    .catch((error) => {
        showError(error.response.data.message);
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
    // console.log(position.coords.latitude, position.coords.longitude);
  });
};
