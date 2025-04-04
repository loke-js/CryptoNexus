import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteWeather } from "../../../../store/slices/weatherSlice";
import { RootState } from "../../../../store/store";
import { WeatherDetails } from "../../../../types/weatherTypes";
import Link from "next/link";
import { Heart } from "lucide-react";

interface WeatherCardProps {
  weather: WeatherDetails;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const isFavorite = favorites.some((fav) => fav.location.name === weather.location.name);

  return (
    <div className="flex flex-col">
    <div className="relative dark:bg-ring/12 shadow-lg rounded-lg p-4 border border-border/40">
      {/* Favorite Toggle Button */}
      <button
        onClick={() => dispatch(toggleFavoriteWeather(weather))}
        className="absolute top-3 right-3 focus:outline-none transition-transform transform active:scale-90 cursor-pointer"
      >
        <Heart
          size={24}
          className={`transition-colors duration-300 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
        />
      </button>

      {/* Weather Details & Link */}
      <div className="">
        <div className="flex items-center justify-between gap-1">
          <Link href={`/weather/${weather.location.lat}&${weather.location.lon}`}>
            <h1 className="text-4xl font-bold transition-transform duration-300 hover:scale-105">{weather.location.name}</h1>
          </Link>
          <img src={weather.current.condition.icon} className="w-14 h-14" alt="" />
        </div>
        <p className="text-primary text-xl font-semibold">
          Temperature: {weather.current.temp_c}°C
        </p>
        <p className="text-primary">Humidity: {weather.current.humidity}</p>
      </div>
    </div>
      </div>
  );
};

export default WeatherCard;
