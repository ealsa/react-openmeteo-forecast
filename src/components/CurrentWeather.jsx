import React from "react";
import "./CurrentWeather.scss";
import icons from "../fetchData/icons";
import { RiWindyFill } from "react-icons/ri";
import { BsFillSunriseFill } from "react-icons/bs";
import { GiSunset } from "react-icons/gi";

const CurrentWeather = ({
  hourlyTemp,
  formattedHourlyTime,
  hourlyWeatherCode,
  hourlyWindSpeed,
  formattedSunrise,
  formattedSunset,
  temp,
  currentDay,
  windspeed,
  weathercode,
  locationName,
  countryCode,
}) => {
  return (
    <div className="current-weather-container">
      <div className="weather-container">
        <div className="location-weather">
          <div className="location-day">
            <h1>
              {locationName}, {countryCode}
            </h1>
            <p>{currentDay}</p>
          </div>
          <div className="temp">
            <h1>
              {temp}
              <span>°C</span>
            </h1>
            <div className="ws-sr-sn">
              <p>
                <span className="windspeed-icon">
                  <RiWindyFill />
                </span>
                Windspeed: {windspeed} km/h
              </p>
              <p>
                <span className="sunrise-icon">
                  <BsFillSunriseFill />
                </span>
                Sunrise: {formattedSunrise}
              </p>
              <p>
                <span className="sunset-icon">
                  <GiSunset />
                </span>{" "}
                Sunset: {formattedSunset}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="img-div">
        <img src={icons(weathercode)} alt="" className="current-weather-icon" />
      </div>
      <div className="hourly-forecast-container">
        {hourlyTemp?.map((temp, i) => (
          <div key={i} className="hourly-weather">
            <p className="hour">{formattedHourlyTime[i]}</p>
            <div className="img-temp">
              <img src={icons(hourlyWeatherCode[i])} alt="" />
              <p>{temp}°</p>
            </div>
            <p className="hourly-windspeed">
              <span className="ws-icon">
                <RiWindyFill />
              </span>
              <span>{hourlyWindSpeed[i]} km/h</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
