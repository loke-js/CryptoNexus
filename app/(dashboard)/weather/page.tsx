"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchPredefinedCities } from "../../../store/slices/weatherSlice";
import WeatherCard from "./_components/WeatherCard";
import { Loader2Icon } from "lucide-react";
import Loader from "@/components/Loader";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WeatherPage: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherDetails, loading } = useSelector((state: RootState) => state.weather);
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  useEffect(() => {
    const fetchData = async () => {
        try {
            setApiError(null);
            await dispatch(fetchPredefinedCities()).unwrap();
        } catch (error) {
            setApiError(`Failed to fetch weather data. Retrying...${error}`);
        }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 60000); // 60s interval

    return () => clearInterval(interval); // Cleanup on unmount
}, [dispatch]);

if (apiError) {
  return (
      <Card className="p-8 flex">
          <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-500">
                  Error Fetching Weather Data
              </CardTitle>
              <CardDescription>{apiError}</CardDescription>
          </CardHeader>
          <CardContent>
              <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                  Retry Now
              </Button>
          </CardContent>
      </Card>
  );
}

  return (
    <div className="p-6 flex flex-col  gap-4">
      <h1 className="text-5xl font-bold  mb-4 ">WeatherPage</h1>
      <div>
        {favorites.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">⭐ Favorite Cities:</h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((fav) => (
                <Link
                  key={fav.location.name}
                  href={`/weather/${fav.location.lat}&${fav.location.lon}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {fav.location.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {loading && <Loader />}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      <div className=" flex-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherDetails.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </div>

    </div>
  );
};

export default WeatherPage;
