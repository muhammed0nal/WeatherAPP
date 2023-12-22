const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const contextEl = document.getElementById("context");
const warningEl = document.getElementById("warning");

const API_KEY = "5ea3bae1e93c772ea87eff3f61fdcddb"
formEl.addEventListener("submit", (e) => {
  if (inputEl.value == "") {
    warningEl.style.display = "block";
  }
  else {
    warningEl.style.display = "none";
    getCityName(inputEl.value);
    inputEl.value = "";
  }
  e.preventDefault();
});

async function getCityName(city) {
  try {
    await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=${1}&appid=${API_KEY}`).then(res => res.json()).then(data => {
      getCity(data[0].lat, data[0].lon)
    })
  } catch (error) {
    console.log(error);
  }

}
async function getCity(lat, lon) {
  try {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data);
      contextEl.innerHTML = `<div class="context-top">
    <div class="top-left">
      <h4 class="city">${data.city.name} (${data.list[0].dt_txt.split(" ")[0]})</h4>
      <p class="left-temp">Temperature: ${((data.list[0].main.temp) - 273.25).toFixed(0)}°C</p>
      <p class="left-wind">Wind: ${data.list[0].wind.speed} M/S</p>
      <p class="left-humidity">Humidity: ${data.list[0].main.humidity}%</p>
    </div>
     <div class="top-right">
      <img
        class="top-img"
        src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"
      />
      <p>${data.list[0].weather[0].main}</p>
    </div> 
  </div>
  <div class="context-bottom">
    <h2 class="four-days">5-Day Forecast</h2>
    <div class="cntx-bttm-bottom">
      <div class="one">
        <p>(${data.list[3].dt_txt.split(" ")[0]})</p>
        <img
        src="https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png"
        />
        <p>Temp: ${((data.list[3].main.temp) - 273.25).toFixed(0)}°C</p>
        <p>Wind: ${data.list[3].wind.speed} M/S</p>
        <p>Humidity: ${data.list[3].main.humidity}%</p>
      </div>
      <div class="two">
        <p>(${data.list[11].dt_txt.split(" ")[0]})</p>
        <img
        src="https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png"
        />
        <p>Temp: ${((data.list[11].main.temp) - 273.25).toFixed(0)}°C</p>
        <p>Wind: ${data.list[11].wind.speed} M/S</p>
        <p>Humidity: ${data.list[11].main.humidity}%</p>
      </div>
      <div class="three">
      <p>(${data.list[19].dt_txt.split(" ")[0]})</p>
      <img
      src="https://openweathermap.org/img/wn/${data.list[19].weather[0].icon}@2x.png"
      />
      <p>Temp: ${((data.list[19].main.temp) - 273.25).toFixed(0)}°C</p>
      <p>Wind: ${data.list[19].wind.speed} M/S</p>
      <p>Humidity: ${data.list[19].main.humidity}%</p>
      </div>
      <div class="four">
      <p>(${data.list[27].dt_txt.split(" ")[0]})</p>
      <img
      src="https://openweathermap.org/img/wn/${data.list[27].weather[0].icon}@2x.png"
      />
      <p>Temp: ${((data.list[27].main.temp) - 273.25).toFixed(0)}°C</p>
      <p>Wind: ${data.list[27].wind.speed} M/S</p>
      <p>Humidity: ${data.list[27].main.humidity}%</p>
      </div>
      <div class="five">
      <p>(${data.list[35].dt_txt.split(" ")[0]})</p>
      <img
      src="https://openweathermap.org/img/wn/${data.list[35].weather[0].icon}@2x.png"
      />
      <p>Temp: ${((data.list[35].main.temp) - 273.25).toFixed(0)}°C</p>
      <p>Wind: ${data.list[35].wind.speed} M/S</p>
      <p>Humidity: ${data.list[35].main.humidity}%</p>
      </div>
    </div>
  </div>`})
  } catch (error) {
    console.log("ha")
  }
}

const currentBtnEl = document.getElementById("current-loc-btn");
currentBtnEl.addEventListener("click", () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }

})

function displayLocationInfo(position) {
  const en = position.coords.longitude.toFixed(4);
  const boy = position.coords.latitude.toFixed(4);
  getCity(boy, en);
  console.log(`${en} ${boy}`);
}
