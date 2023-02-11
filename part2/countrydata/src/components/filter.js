
import React from "react";
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
export default SearchBar;