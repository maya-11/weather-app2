import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const API_KEY = "50fa4024e3b1d5eac2f51ab18a47e997";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Weather Forecast</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="forecast">
            {weatherData.list
              .filter((item, index) => index % 8 === 0)
              .map((day, index) => (
                <div key={index} className="forecast-day">
                  <h3>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="temp">
                    {Math.round(day.main.temp_min)}°C /{" "}
                    {Math.round(day.main.temp_max)}°C
                  </p>
                  <p className="condition">
                    {getWeatherIcon(day.weather[0].main)} {day.weather[0].main}
                  </p>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
