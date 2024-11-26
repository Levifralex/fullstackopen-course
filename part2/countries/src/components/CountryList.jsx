import PropTypes from "prop-types";
import CountryDetail from "./CountryDetail";

const CountryList = ({ countries, selectedCountry, onShowDetail }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	if (selectedCountry) {
		return <CountryDetail country={selectedCountry} />;
	}

	return (
		<ul className="countryList">
			{countries.map((country) => (
				<li key={country.name.common}>
					<span style={{ alignContent: "center" }}>{country.name.common}</span>
					<button
						className="btnShowCountryDetail"
						onClick={() => onShowDetail(country)}
					>
						show
					</button>
				</li>
			))}
		</ul>
	);
};

CountryList.propTypes = {
	countries: PropTypes.array,
	selectedCountry: PropTypes.object,
	showDetail: PropTypes.bool,
	onShowDetail: PropTypes.func,
};

export default CountryList;
