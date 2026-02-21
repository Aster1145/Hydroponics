import React, { useState, useEffect } from 'react';

// --- Placeholder Data ---
// In a real app, you would fetch this from a weather API like OpenWeatherMap or WeatherAPI.
const placeholderForecast = [
  { day: 'Mon', temp: 24, humidity: 60, icon: '☀️' },
  { day: 'Tue', temp: 22, humidity: 65, icon: '⛅️' },
  { day: 'Wed', temp: 20, humidity: 70, icon: '🌧️' },
  { day: 'Thu', temp: 23, humidity: 68, icon: '⛅️' },
  { day: 'Fri', temp: 25, humidity: 62, icon: '☀️' },
];

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(placeholderForecast);

  useEffect(() => {
    // TODO: Add your weather API call here.
    // 1. Get user's location (e.g., via browser geolocation or a fixed lat/lon).
    // 2. Fetch data from a weather API.
    // 3. Map the API response to the format of `placeholderForecast`.
    // 4. setForecast(mappedData);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">5-Day Local Forecast</h3>
      <div className="flex justify-between space-x-2">
        {forecast.map((day, index) => (
          <div key={index} className="flex-1 bg-gray-700 rounded-lg p-2 text-center">
            <p className="font-bold text-white">{day.day}</p>
            <p className="text-3xl my-1">{day.icon}</p>
            <p className="text-sm text-gray-300">{day.temp}°C</p>
            <p className="text-xs text-gray-400">💧{day.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
