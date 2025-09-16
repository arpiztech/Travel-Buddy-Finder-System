import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  Umbrella,
} from "lucide-react";

// Mock data for different locations
const weatherDB = {
  "Paris, France": {
    current: {
      temp: 27,
      condition: "Sunny",
      feelsLike: 26,
      humidity: 55,
      wind: "14 km/h NE",
      sunrise: "6:25 AM",
      sunset: "7:45 PM",
      suggestion: "Carry a light jacket, rain expected tomorrow.",
      isDay: true,
    },
    forecast: [
      { day: "Wed", temp: 27, condition: "Sunny" },
      { day: "Thu", temp: 25, condition: "Cloudy" },
      { day: "Fri", temp: 22, condition: "Rainy" },
    ],
  },
  "New York, USA": {
    current: {
      temp: 18,
      condition: "Rainy",
      feelsLike: 17,
      humidity: 70,
      wind: "20 km/h W",
      sunrise: "6:10 AM",
      sunset: "7:20 PM",
      suggestion: "Carry an umbrella, wear waterproof shoes.",
      isDay: false,
    },
    forecast: [
      { day: "Wed", temp: 18, condition: "Rainy" },
      { day: "Thu", temp: 20, condition: "Cloudy" },
      { day: "Fri", temp: 22, condition: "Sunny" },
    ],
  },
};

const WeatherTrip = () => {
  const [location, setLocation] = useState("Paris, France");
  const [weather, setWeather] = useState(weatherDB[location].current);

  const [forecast, setForecast] = useState(weatherDB[location].forecast);

  // Update weather on location change
  useEffect(() => {
    setWeather(weatherDB[location].current);
    setForecast(weatherDB[location].forecast);
  }, [location]);

  const getIcon = (condition, size = 40, isDay = true) => {
    switch (condition) {
      case "Sunny":
        return isDay ? <Sun size={size} className="text-yellow-400" /> : <Moon size={size} className="text-gray-300" />;
      case "Cloudy":
        return <Cloud size={size} className="text-gray-500" />;
      case "Rainy":
        return <CloudRain size={size} className="text-blue-500" />;
      default:
        return <Sun size={size} className="text-yellow-400" />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-4">
      {/* Location Selector */}
      <div className="mb-4">
        <select
          className="border p-2 rounded w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {Object.keys(weatherDB).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Current Weather */}
      <div className="text-center mb-4">
        <div className="flex justify-center">{getIcon(weather.condition, 60, weather.isDay)}</div>
        <h2 className="text-3xl font-bold mt-2">{weather.temp}°C • {weather.condition}</h2>
        <p className="text-gray-600 text-sm italic">
          Feels like {weather.feelsLike}°C • {weather.isDay ? "Day" : "Night"}
        </p>
        <div className="flex justify-center gap-4 mt-2 text-gray-700 text-sm">
          <span className="flex items-center gap-1"><Droplets size={16} /> {weather.humidity}%</span>
          <span className="flex items-center gap-1"><Wind size={16} /> {weather.wind}</span>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
        <Umbrella size={16} className="text-blue-500" /> {weather.suggestion}
      </div>

      {/* Forecast */}
      <h3 className="font-semibold mb-2">3-Day Forecast</h3>
      <div className="flex justify-between gap-2">
        {forecast.map((f, idx) => (
          <div key={idx} className="flex-1 bg-gray-50 p-2 rounded-lg text-center">
            <p className="font-semibold">{f.day}</p>
            <div className="flex justify-center mt-1">{getIcon(f.condition, 30, weather.isDay)}</div>
            <p className="text-sm mt-1">{f.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherTrip;
