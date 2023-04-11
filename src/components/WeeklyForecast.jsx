import React from "react";
import "./WeeklyForecast.scss";
import icons from "../fetchData/icons";
import { BsFillSunriseFill } from "react-icons/bs";
import { GiSunset } from "react-icons/gi";

const WeeklyForecast = ({
  formattedTime,
  dailyWeatherCode,
  formattedSunrise,
  formattedSunset,
  maxTemp,
  minTemp,
}) => {
  return (
    <div className="weekly-forecast">
      <h1>Weekly Forecast</h1>
      <div className="weekly-weather">
        {formattedTime?.map((time, i) => (
          <div key={i} className="weekly-weather-container">
            <p className="day">{time}</p>
            <img src={icons(dailyWeatherCode[i])} alt="" className="icon" />
            <p className="weekly-sunrise-set">
              <span className="rise">
                <BsFillSunriseFill /> {formattedSunrise[i]}
              </span>
              <span className="set">
                <GiSunset /> {formattedSunset[i]}
              </span>
            </p>
            <div className="min-max">
              <p className="max">{maxTemp[i]}°</p>
              <p className="min">{minTemp[i]}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
