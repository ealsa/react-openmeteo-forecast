import React, { useState } from "react";
import "./SearchLocation.scss";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const SearchLocation = ({ setLocation, currentTime }) => {
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue === "") return null;
    setLocation(inputValue);
    setInputValue("");
  };
  const handleEnter = (e) => {
    if (inputValue === "") return null;
    if (e.key === "Enter") {
      setLocation(inputValue);
      setInputValue("");
    }
  };

  async function getCurrentCity() {
    // Get the current position
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Extract the latitude and longitude
    const { latitude, longitude } = position.coords;

    // Call the OpenCage Data API to get the city name
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5f0602d3e3844cabaa1fd1101e4b0c83`,
    );
    const data = await response.json();

    // Extract the city name from the response
    const city = data.results[0].components.province;

    setLocation(city);
  }

  return (
    <div className="search-location-container">
      <h1>Weather Forecast</h1>
      <div className="date">
        <p>{currentTime}</p>
      </div>
      <div className="input-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search location..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button className="search-btn" onClick={handleClick}>
          <AiOutlineSearch />
        </button>

        <button className="current-location-btn" onClick={getCurrentCity}>
          <BiCurrentLocation /> Current
        </button>
      </div>
    </div>
  );
};

export default SearchLocation;
