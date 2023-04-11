import { useState, useEffect } from "react";
import { fromUnixTime, format } from "date-fns";

function useWeatherData(
  lat = "51.50853",
  lon = "-0.12574",
  timezone = "Europe/London",
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timeformat=unixtime&timezone=${encodeURIComponent(
            timezone,
          )}`,
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    }

    fetchWeatherData();
  }, [lat, lon, timezone]);

  const getDaily = () => {
    if (!data) return null;
    const {
      time,
      sunrise,
      sunset,
      weathercode: dailyWeatherCode,
      temperature_2m_max: maxTemp,
      temperature_2m_min: minTemp,
    } = data.daily;

    const formattedSunrise = sunrise.map((el) => {
      return format(fromUnixTime(el), "hh:mm a");
    });

    const formattedSunset = sunset.map((el) => {
      return format(fromUnixTime(el), "hh:mm a");
    });

    const formattedTime = time.map((el) => {
      return format(fromUnixTime(el), "EEE");
    });

    return {
      formattedTime,
      dailyWeatherCode,
      formattedSunrise,
      formattedSunset,
      maxTemp,
      minTemp,
    };
  };

  const getHourly = () => {
    if (!data) return null;
    const { temperature_2m, time, weathercode, windspeed_10m } = data.hourly;

    const currentTime = data.current_weather.time;
    const nextTwelveHours = time
      .filter((ht) => {
        return currentTime < ht;
      })
      .slice(0, 12);

    const hourlyIndex = time.indexOf(nextTwelveHours[0]);
    const hourlyTemp = temperature_2m.slice(hourlyIndex, hourlyIndex + 12);
    const hourlyWindspeed = windspeed_10m.slice(hourlyIndex, hourlyIndex + 12);
    const hourlyWeatherCode = weathercode.slice(hourlyIndex, hourlyIndex + 12);

    const formattedHourlyTime = nextTwelveHours.map((ht) => {
      return format(fromUnixTime(ht), "ha");
    });

    return {
      hourlyTemp,
      formattedHourlyTime,
      hourlyWeatherCode,
      hourlyWindspeed,
    };
  };

  const getWeatherData = () => {
    if (!data) return null;
    const { latitude, longitude } = data;
    const {
      temperature,
      windspeed,
      weathercode,
      time: currentTime,
    } = data.current_weather;

    const formattedCurrentTimeDate = format(
      fromUnixTime(currentTime),
      "MMMM d, yyyy",
    );
    const formattedCurrentDay = format(fromUnixTime(currentTime), "EEEE");

    return {
      latitude,
      longitude,
      temperature,
      windspeed,
      weathercode,
      formattedCurrentTimeDate,
      formattedCurrentDay,
    };
  };

  return { getWeatherData, getDaily, getHourly, error };
}

export default useWeatherData;
