import PropTypes from "prop-types";
import CountryWeather from "./CountryWeather";

const CountryDetail = ({ country }) => {
	return (
		<>
			<h1>{country.name.common}</h1>
			<p className="countryInfo">Capital: {country.capital}</p>
			<p className="countryInfo">Area: {country.population}</p>

			<h4>languages:</h4>
			{Object.values(country.languages).map((language, index) => (
				<li key={index}>{language}</li>
			))}

			<div style={{ marginTop: "20px" }}>
				<img className="countryFlag" src={country.flags.png} alt={country.flags.alt} />
			</div>

			<CountryWeather
				countryName={country.name.common}
				latitud={country.latlng[0]}
				longitude={country.latlng[1]}
			/>
		</>
	);
};

CountryDetail.propTypes = {
	country: PropTypes.object,
};

export default CountryDetail;
