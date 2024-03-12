import { useState, useEffect } from "react";
import countryServices from '../services/countryService';

const Weather = ({ name, lat, lng }) => {
  const [ weatherInfo, setWeatherInfo ] = useState(null);

  useEffect(() => {
    countryServices.getWeather(lat, lng)
      .then(weather => {
        setWeatherInfo(weather);
      });
  }, [lat, lng]);

  if (!weatherInfo) return <h1>LOADING...</h1>

  return (
    <>
      <h2>Weather in {name}</h2>
      <p>Temperature: {((weatherInfo.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)} &#x2109;</p>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={`${weatherInfo.weather[0].description}`} />
      </div>
      <p>Wind: {weatherInfo.wind.speed} m/s</p>
    </>
  )
}

export default Weather;