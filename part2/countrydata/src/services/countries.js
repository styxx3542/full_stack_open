import axios from "axios";
const BaseURL = "https://restcountries.com/v3.1/all"
const getAll = () => axios
.get(BaseURL)
.then(response => response.data)

export default 
{
    getAll
}