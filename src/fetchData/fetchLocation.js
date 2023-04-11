import { useEffect, useState } from "react";

const fetchLocation = (location) => {
  const [locationData, setLocationData] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}&language=en&count=1&format=json`,
        );

        const data = await response.json();
        setLocationData(data);
      } catch (e) {
        setLocationError(e);
      }
    }

    fetchLocationData();
  }, [location]);

  const formattedLocationData = () => {
    if (!locationData) return null;

    const {
      latitude: locationLat,
      longitude: locationLon,
      name: locationName,
      country_code: countryCode,
      timezone: countryTimezone,
    } = locationData.results[0];

    return {
      locationName,
      countryCode,
      countryTimezone,
      locationLat,
      locationLon,
    };
  };

  return { locationData, formattedLocationData, locationError };
};

export default fetchLocation;
