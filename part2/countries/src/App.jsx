import { useState, useEffect } from "react";
import countriesService from "./services/countries";

function App() {

  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const hook = () => {
    countriesService
      .getAll()
      .then((countriesList) => {
        console.log('countriesList :>> ', countriesList);
        setCountries(countriesList);
      })
      .catch((error) => {
        console.error("error => ", error);
      });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    const typed = event.target.value;
    setFilter(event.target.value);
    console.log('filter :>> ', filter);
    const countriesFiltered = countries.filter(element => element.name.common.includes(typed));
    console.log('countriesFiltered :>> ', countriesFiltered);
  };

  return (
    <>
      find countries: <input value={filter} onChange={handleFilterChange} />
      <pre>results here</pre>
    </>
  );
}

export default App;
