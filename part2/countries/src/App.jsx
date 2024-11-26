import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import Filter from "./components/Filter";

function App() {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const hook = () => {
		countriesService
			.getAll()
			.then((countriesList) => {
				console.log("countriesList :>> ", countriesList);
				setCountries(countriesList);
			})
			.catch((error) => {
				console.error("error => ", error);
			});
	};

	useEffect(hook, []);

	const countriesFiltered = countries.filter((element) =>
		element.name.common.trim().toLowerCase().includes(filter.toLowerCase())
	);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		//reset selected country when filter changes
		setSelectedCountry(null);
	};

	const handleShowDetail = (country) => {
		setSelectedCountry(country);
	};

	if(!countries.length) return <p>Loading...</p>

	return (
		<>
			<Filter value={filter} onChange={handleFilterChange} />
			
			{countriesFiltered.length === 1 ? (
				<CountryDetail country={countriesFiltered[0]} />
			) : (
				<CountryList
					countries={countriesFiltered}
					selectedCountry={selectedCountry}
					onShowDetail={handleShowDetail}
				/>
			)}
		</>
	);
}

export default App;
