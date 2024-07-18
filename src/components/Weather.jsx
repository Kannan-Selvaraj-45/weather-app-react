import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
const appId = import.meta.env.VITE_APP_ID;

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const inputRef = useRef();

  const allIcon = {
    "01d": clear_icon,
    "02d": cloud_icon,
    "03d": drizzle_icon,
    "04d": cloud_icon,
    "05d": cloud_icon,
    "06d": clear_icon,
    "07d": drizzle_icon,
    "08d": drizzle_icon,
    "09d": rain_icon,
    "010d": rain_icon,
    "011d": snow_icon,
    "012d": snow_icon,
    "013d": snow_icon,
  };

  const search = async (city) => {
    if (city !== "") {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }
        const icon = allIcon[data.weather[0].icon] || clear_icon;
        setWeather({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
        setIsloading(false);
      } catch (error) {
        setIsloading(true);
      }
    }
  };

  useEffect(() => {
    search("Coimbatore");
  }, []);

  return (
    <>
      {isLoading ? (
        <p className="error">Loading...</p>
      ) : (
        <div className="weather">
          <div className="search-bar">
            <input type="search" placeholder="search" ref={inputRef} />
            <img
              src={search_icon}
              onClick={() => search(inputRef.current.value)}
            />
          </div>
          {weather ? (
            <>
              <img className="weather-icon" src={weather.icon} />
              <p className="temp">{weather.temperature}°c</p>
              <p className="location">{weather.location}</p>
              <div className="weather-data">
                <div className="col">
                  <img src={humidity_icon} />
                  <div>
                    <p>{weather.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </div>

                <div className="col">
                  <img src={wind_icon} />
                  <div>
                    <p>{weather.windSpeed} km/h</p>
                    <span>Wind</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="error">Invalid Request</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Weather;
