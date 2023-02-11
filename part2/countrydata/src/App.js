import { useEffect, useState } from "react";
import countryService from "./services/countries.js";
import SearchBar from "./components/filter.js"
import Display from "./components/display.js"



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
