import { useEffect, useState } from "react";
import countryService from "./services/countries.js";
const SearchBar = ({ setFilter}) => {
  return (
    <div>
      find countries - 
      <input
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      ></input>
    </div>
  );
};

const Display = ({filter,setFilter,countries}) => {
  if(!countries)return null;
  if (!filter) return null;
  const displayedCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (displayedCountries.length > 10) {
    return <div>Too many values. Please specify</div>;
  }
  if (displayedCountries.length > 1) {
    return (
      <div>
        {displayedCountries.map((country, index) => {
          return (
            <div key={index}>
              <li> {country.name.common}</li>
              <button
                onClick={() => {
                  setFilter(country.name.common)
                }}
              >
                Show
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  if (displayedCountries.length === 1) {
    return <ShowView country={displayedCountries[0]} />;
  }
};
const ShowView = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <LanguageList country={country} />
      <Flag country={country} />
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
  return <img src={flag_src} width="50" height="50" />;
};
const App = (props) => {
  const [ filter,setFilter ] = useState("")
  const [all,setAll] = useState([])
  useEffect(() => {
    countryService.getAll().then((arr) => {
      setAll(arr);
    });
  }, []);
  
  return (
    <div>
      <SearchBar setFilter = {setFilter}/>
      <Display
        filter  = {filter}
        setFilter = {setFilter}
        countries={all}
      />
    </div>
  );
};

export default App;
