import React from "react";
import {WeatherData } from "../../../../store/slices/weatherSlice";

interface CryptoCardProps {
  weather: WeatherData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ weather}) => {

    const {}
  return (
    <div className="dark:bg-ring/12 shadow-lg rounded-lg p-4 border border-border/40">
      <h1 className="text-4xl font-bold"></h1>
      <p className="text-primary text-xl font-semibold">Temperature</p>
      <p className="text-primary">Humidity</p>
    </div>
  );
};

export default CryptoCard;
