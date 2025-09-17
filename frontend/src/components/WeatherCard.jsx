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
} from "lucide-react";

const API_KEY = "40fd47eb621909c3311ca39eeb6170bb"; // 🔑 apna API key

const states = [
  { name: "New Delhi", country: "IN" },
  { name: "Mumbai", country: "IN" },
  { name: "Bangalore", country: "IN" },
  { name: "New York", country: "US" },
  { name: "London", country: "GB" },
  { name: "Paris", country: "FR" },
];

const WeatherCard = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (city, country) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      setWeather({
        location: `${data.name}, ${data.sys.country}`,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].main,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
      });

      setLoading(false);
    } catch (err) {
      console.error("Weather fetch error:", err.message);
      setError("❌ Failed to load weather data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedState.name, selectedState.country);
  }, [selectedState]);

  const getSuggestion = () => {
    if (!weather) return "";
    const { condition, isDay } = weather;
    if (condition.includes("Rain")) return "🌧 Carry an umbrella";
    if (condition.includes("Clear") && isDay) return "😎 Wear sunglasses";
    if (condition.includes("Cloud")) return "☁️ Might be cloudy, take a light jacket";
    return "🌟 Have a nice day!";
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    const { condition, isDay } = weather;
    if (condition.includes("Clear"))
      return isDay ? <Sun size={40} /> : <Moon size={40} />;
    if (condition.includes("Cloud")) return <Cloud size={40} />;
    if (condition.includes("Rain")) return <CloudRain size={40} />;
    return isDay ? <Sun size={40} /> : <Moon size={40} />;
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-5 border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-gray-800">Weather</h3>
        <select
          value={selectedState.name}
          onChange={(e) =>
            setSelectedState(states.find((s) => s.name === e.target.value))
          }
          className="border rounded-lg px-2 py-1 text-sm"
        >
          {states.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">⏳ Loading weather data...</p>
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : weather ? (
        <>
          {/* ✅ Success message */}
          <p className="text-green-600 font-semibold mb-2">
            ✅ Weather information loaded successfully
          </p>

          <div className="flex items-center space-x-4">
            {getWeatherIcon()}
            <div>
              <h2 className="text-3xl font-bold">{weather.temp}°C</h2>
              <p className="text-sm text-gray-600">
                Feels like {weather.feelsLike}°C
              </p>
              <p className="text-gray-700 font-medium">{weather.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
            <p>🌤 Condition: {weather.condition}</p>
            <p>
              <Wind className="inline-block" size={16} /> {weather.wind} km/h
            </p>
            <p>
              <Droplets className="inline-block" size={16} /> {weather.humidity}%
            </p>
            <p>
              <Sunrise className="inline-block" size={16} /> {weather.sunrise}
            </p>
            <p>
              <Sunset className="inline-block" size={16} /> {weather.sunset}
            </p>
          </div>

          <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-3 rounded">
            {getSuggestion()}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default WeatherCard;
