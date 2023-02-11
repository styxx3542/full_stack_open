import React from "react";
import { useState, useEffect } from "react";
import CountryService from "../services/countries.js";
const ShowView = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    CountryService.getWeather(lat, lon, api_key).then((weather) =>
      setWeather(weather)
    );
  }, [lat, lon, api_key]);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <LanguageList country={country} />
      <Flag country={country} />
      <Weather weather={weather} capital = {country.capital[0]}/>
    </div>
  );
};
const Weather = ({ capital,weather }) => {
  if (weather.length ===0) return null;
  const code = weather.weather[0].icon;
  const image_url = `http://openweathermap.org/img/wn/${code}@2x.png`;
  const temperature = weather.main.temp;
  const wind_speed = weather.wind.speed;
  return (
    <div>
        <h2> Weather in {capital}</h2>
      <p>Temperature = {temperature} Celcius</p>
      <img src = {image_url} alt = "weather_description"/>
      <p>wind speed = {wind_speed}m/s</p>
    </div>
  );
};
const LanguageList = ({ country }) => {
  if (!country) return null;
  return (
    <div>
      <h3> Languages: </h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    </div>
  );
};
const Flag = ({ country }) => {
  const flag_src = country.flags.png;
  return <img src={flag_src} alt="country flag" width="50" height="50" />;
};
export default ShowView;
