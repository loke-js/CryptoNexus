import React from "react";
import {WeatherData } from "../../../../store/slices/weatherSlice";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather}) => {
  const { current,location} = weather;

  return (
    <div className="dark:bg-ring/12 shadow-lg rounded-lg p-4 border border-border/40">
      <div className="flex items-center justify-between gap-1">
      <h1 className="text-4xl font-bold">{location.name}</h1>
      <img src={current.condition.icon} className="w-14 h-14" alt="" />
      </div>
      <p className="text-primary text-xl font-semibold">Temperature: {current.temp_c}°C</p>
      <p className="text-primary">Humidity: {current.humidity}</p>
    </div>
  );
};

export default WeatherCard;
