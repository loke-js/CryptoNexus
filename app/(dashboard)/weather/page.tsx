"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchWeather } from "../../../store/slices/weatherSlice";
import WeatherCard from "./_components/WeatherCard";
import { Loader2Icon } from "lucide-react";
import Loader from "@/components/Loader";

const WeatherPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading} = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold  mb-4">WeatherPage</h1>

      {loading && <Loader/>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
