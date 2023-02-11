import axios from "axios";
const BaseURL = "https://restcountries.com/v3.1/all";
const getAll = () => axios.get(BaseURL).then((response) => response.data);
const getWeather = (lat, lon, api_key) =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    )
    .then(response => response.data)
;
const getImage = (code) => {
    const image_url = `http://openweathermap.org/img/wn/${code}@2x.png`;
    return (axios
    .get(image_url)
    .then(response => response))
}
;
export default {
  getAll,
  getWeather,
  getImage,
};
