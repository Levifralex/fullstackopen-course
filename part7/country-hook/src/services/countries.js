import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountryByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
};

export default { getCountryByName }