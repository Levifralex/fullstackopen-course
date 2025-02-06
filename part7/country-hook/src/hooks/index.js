import React, { useState, useEffect } from "react";
import countriesService from "../services/countries";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name.length === 0) {
      return;
    }
    console.log("name :>> ", name);

    countriesService
      .getCountryByName(name)
      .then((data) => {
        console.log("data :>> ", data);
        setCountry({
            found: true,
            data: {
                name: data.name.common,
                capital: data.capital[0],
                population: data.population,
                flag: data.flags.png
            }
        });
      })
      .catch((error) => {
        console.log("error :>> ", error);
        setCountry({
            found: false
        });
      });
  }, [name]);

  return country;
};
