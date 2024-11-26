import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const CountryWeather = ({ countryName, latitud, longitude }) => {

	const [weatherData, setWeatherData] = useState({});

	const hook = () => {
		weatherService
			.getWeather(latitud, longitude)
			.then((weatherData) => {
				console.log("weatherData :>> ", weatherData);
				setWeatherData(weatherData);
			})
			.catch((error) => {
				console.error("error => ", error);
			});
	};

	useEffect(hook, []);

	function getWeatherIcon(icon) {
		return `http://openweathermap.org/img/wn/${icon}@2x.png`;
	}

	if(!weatherData.main) return <p>Loading...</p>

	return (
		<>
			<h2>Weather in {countryName}</h2>
			<p>Temperature: {weatherData.main.temp} Celsius</p>
			<img
				src={getWeatherIcon(weatherData.weather[0].icon)}
				alt={weatherData.weather[0].description}
			/>
			<p>Wind: {weatherData.wind.speed} m/s</p>
		</>
	);
};

CountryWeather.propTypes = {
	countryName: PropTypes.string,
	latitud: PropTypes.number,
	longitude: PropTypes.number,
};

export default CountryWeather;
