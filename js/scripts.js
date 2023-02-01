// Variáveis e seleção de elementos.
const apiKey = "4caf133e2c72235b9365904ba8df8145";
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4caf133e2c72235b9365904ba8df8145"

const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
async function getWeatherData(city) {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    //https://api.openweathermap.org/data/2.5/weather?q=campinas&units=metric&appid=4caf133e2c72235b9365904ba8df8145&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    const data = await res.json();

    console.log(data);

    return data;
};

async function showWheaterData(city) {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

//Eventos
     searchBtn.addEventListener("click", (e) => {

     e.preventDefault();

     const city = cityInput.value;

     showWheaterData(city);
    //  city.value = getWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => { //funcionalidade da tecla ENTER.

    if(e.code === "Enter") {
        const city = e.target.value;

        showWheaterData(city);
    }

})
