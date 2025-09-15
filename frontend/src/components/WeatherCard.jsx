import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiHumidity,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FaTshirt } from "react-icons/fa";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  // Icon for condition
  const getIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <WiDaySunny size={22} color="#f39c12" />;
      case "Cloudy":
        return <WiCloudy size={22} color="#7f8c8d" />;
      case "Rainy":
        return <WiRain size={22} color="#3498db" />;
      case "Snowy":
        return <WiSnow size={22} color="#00BFFF" />;
      default:
        return <WiDaySunny size={22} color="#f39c12" />;
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3">
      {/* Header */}
      <div className="card-header bg-white text-center fw-bold">
        🌍 Weather in {weather.location}
      </div>

      {/* Current Weather */}
      <div className="card-body text-center">
        <h4>
          {getIcon(weather.current.condition)} {weather.current.temp}°C •{" "}
          {weather.current.condition}
        </h4>
        <p className="text-muted mb-1">
          Feels like {weather.current.feelsLike}°C | Humidity:{" "}
          {weather.current.humidity}% | Wind: {weather.current.wind}
        </p>
        <p className="text-muted small mb-3">
          <WiSunrise size={20} color="#f39c12" /> Sunrise: {weather.sunrise} |
          <WiSunset size={20} color="#e74c3c" /> Sunset: {weather.sunset}
        </p>

        {/* Forecast Section */}
        <div className="row text-center mb-3">
          {weather.forecast.map((f, i) => (
            <div key={i} className="col border rounded p-2 mx-1 bg-light">
              <strong>{f.date}</strong>
              <div>{getIcon(f.condition)}</div>
              <span>{f.temp}</span>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {weather.suggestion && (
          <p className="text-primary mb-1">
            ☂️ Suggestion: {weather.suggestion}
          </p>
        )}

        {/* Safety */}
        {weather.safety && (
          <p className="text-success mb-1">✅ Safety: {weather.safety}</p>
        )}

        {/* Extras */}
        <p className="text-muted small mb-0">
          ☀️ UV Index: {weather.extras.uv} | 🌍 AQI: {weather.extras.aqi} | 🕒{" "}
          Local Time: {weather.extras.localTime}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
