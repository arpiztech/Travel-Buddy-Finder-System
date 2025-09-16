// src/components/WeatherCard.jsx
import React, { useState } from "react";
import { Sun, Moon, Cloud, CloudRain, Wind, Droplets, Sunrise, Sunset } from "lucide-react";

const WeatherCard = () => {
  const [weather, setWeather] = useState({
    location: "New York, USA",
    temp: 25,
    condition: "Sunny",
    feelsLike: 27,
    wind: 10,
    humidity: 60,
    sunrise: "06:10 AM",
    sunset: "06:45 PM",
    isDay: true,
  });

  const getSuggestion = () => {
    const { condition, isDay } = weather;
    if (condition.includes("Rain")) return "Carry an umbrella ☔";
    if (condition.includes("Sunny") && isDay) return "Wear sunglasses 😎";
    if (condition.includes("Cloud")) return "Might be cloudy, take a light jacket 🌤️";
    return "Have a nice day! 🌟";
  };

  const getWeatherIcon = () => {
    const { condition, isDay } = weather;
    if (condition.includes("Sunny")) return <Sun size={30} />;
    if (condition.includes("Cloud")) return <Cloud size={30} />;
    if (condition.includes("Rain")) return <CloudRain size={30} />;
    return isDay ? <Sun size={30} /> : <Moon size={30} />;
  };

  return (
    <div className="card p-3 shadow-sm mb-3" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="card-title">{weather.location}</h5>
        {weather.isDay ? <Sun size={24} /> : <Moon size={24} />}
      </div>
      <div className="d-flex align-items-center mb-3">
        {getWeatherIcon()}
        <div className="ms-3">
          <h2 className="mb-0">{weather.temp}°C</h2>
          <small>Feels like {weather.feelsLike}°C</small>
        </div>
      </div>
      <p className="mb-1">Condition: {weather.condition}</p>
      <p className="mb-1">Wind: {weather.wind} km/h <Wind size={16} /></p>
      <p className="mb-1">Humidity: {weather.humidity}% <Droplets size={16} /></p>
      <p className="mb-1">Sunrise: {weather.sunrise} <Sunrise size={16} /></p>
      <p className="mb-3">Sunset: {weather.sunset} <Sunset size={16} /></p>
      <div className="alert alert-info p-2 mb-0">{getSuggestion()}</div>
    </div>
  );
};

export default WeatherCard;
