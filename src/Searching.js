import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="row" id="form">
    <form onSubmit={handleSubmit}>
      <input type="search" className="form-control" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit" className="btn btn-primary">🔍</button>
    </form>
</div>
  );
 
 
    return (
        <section>
        <div className="container">
          <div className="weather-app-wrapper">
            <div className="form">
            
                {form}
            
            </div>

            <div className="row" id="principal">
              <div className="col-6">
                <p id="city">Madrid</p>
                <div className="clearfix weather-temperature">
                <img src={weather.icon} alt={weather.description} />
                  <div className="float-left">
                    {Math.round(weather.temperature)}ºC
                    
                    <p id="explain">{weather.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <ul>
                  <li id="humi">Humidity: {weather.humidity}%</li>
                  <li id="wind">Wind: {weather.wind}km/h</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } 
