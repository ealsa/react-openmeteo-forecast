import { useState } from "react";
import "./App.scss";
import SearchLocation from "./components/SearchLocation";
import useWeatherData from "./fetchData/fetchData";
import fetchLocation from "./fetchData/fetchLocation";
import CurrentWeather from "./components/CurrentWeather";
import icons from "./fetchData/icons";
import WeeklyForecast from "./components/WeeklyForecast";

function App() {
  const [location, setLocation] = useState("London");
  const { formattedLocationData, locationError } = fetchLocation(location);
  const {
    locationName,
    countryCode,
    countryTimezone,
    locationLat,
    locationLon,
  } = formattedLocationData() || {};
  const { getWeatherData, getHourly, getDaily, error } = useWeatherData(
    locationLat,
    locationLon,
    countryTimezone,
  );
  const {
    temperature,
    windspeed,
    weathercode,
    formattedCurrentTimeDate,
    formattedCurrentDay,
  } = getWeatherData() || {};
  const {
    hourlyTemp,
    formattedHourlyTime,
    hourlyWeatherCode,
    hourlyWindspeed,
  } = getHourly() || {};
  const {
    formattedTime,
    dailyWeatherCode,
    formattedSunrise,
    formattedSunset,
    maxTemp,
    minTemp,
  } = getDaily() || {};

  if (error || locationError) {
    console.log("ERROR BRUHHHHHH");
    return <div>Error fetching weather data</div>;
  }

  if (!temperature) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <SearchLocation
        setLocation={setLocation}
        currentTime={formattedCurrentTimeDate}
      />
      <CurrentWeather
        hourlyTemp={hourlyTemp}
        formattedHourlyTime={formattedHourlyTime}
        hourlyWeatherCode={hourlyWeatherCode}
        hourlyWindSpeed={hourlyWindspeed}
        formattedSunrise={formattedSunrise?.[0]}
        formattedSunset={formattedSunset?.[0]}
        temp={temperature}
        windspeed={windspeed}
        weathercode={weathercode}
        currentDay={formattedCurrentDay}
        locationName={locationName}
        countryCode={countryCode}
      />
      <WeeklyForecast
        dailyWeatherCode={dailyWeatherCode}
        formattedTime={formattedTime}
        formattedSunrise={formattedSunrise}
        formattedSunset={formattedSunset}
        maxTemp={maxTemp}
        minTemp={minTemp}
      />
    </div>
  );
}

export default App;
