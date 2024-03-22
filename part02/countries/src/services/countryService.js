import axios from "axios";
const API_KEY = import.meta.env.VITE_SOME_KEY;

const getAll = () => {
  const response = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
  return response
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const getWeather = (lat, lon) => {
  const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return response
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export default {
  getAll,
  getWeather,
};
