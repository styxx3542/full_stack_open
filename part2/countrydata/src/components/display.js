
import React from "react";
import ShowView from "./country.js"
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
  export default Display;