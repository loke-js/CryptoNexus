"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPredefinedCities, fetchWeatherDetails } from "../../../store/slices/weatherSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers2 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { log } from "console";

const chartConfig = {
    temperature: {
        label: "Temperature",
        color: "oklch(0.623 0.214 259.815)",
    },
}

const WeatherDetails: React.FC = () => {
    const { weatherId } = useParams();
    
    const dispatch = useDispatch<AppDispatch>();
    const { weatherDetails, loading } = useSelector((state: RootState) => state.weather);
        

    const lat = weatherId?.toString().split('%26')[0];
    const lon = weatherId?.toString().split('%26')[1];

    const cityData = weatherDetails.find((w) => (w.location.lat.toString() === lat && w.location.lon.toString() === lon));
     useEffect(() => {
            if (!cityData) {
                dispatch(fetchPredefinedCities()); // Fetch if not in Redux
            }
        }, [ cityData, dispatch]);
    const chartData = cityData?.forecast.forecastday[0].hour.map((hour) => ({
        time: hour.time, // Extracting the timestamp
        temperature: hour.temp_c, // Keeping only required temperature field
        humidity: hour.humidity, // Keeping humidity
        windSpeed: hour.wind_kph, // Keeping wind speed
    }));
    console.log(chartData);

    return (
        <Card className="p-8">
            <CardHeader>
                <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                    <Layers2 className='w-6 h-6 text-primary' />
                    Temperature Data
                </CardTitle>
                <CardDescription>
                Last 24 Hours Weather Forecast.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                    <BarChart data={chartData} height={200} accessibilityLayer margin={{ top: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            minTickGap={20}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,  // Use 24-hour format
                                });
                            }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent className='w-[250px]' />} />
                        <Bar
                            min={0}
                            type={'bump'}
                            fill='var(--color-temperature)'
                            fillOpacity={0.6}
                            stroke='var(--color-temperature)'
                            dataKey={"temperature"}
                            stackId={"a"}
                        />
                        {/* <Area
                            min={0}
                            type={'bump'}
                            fill='var(--color-failed)'
                            fillOpacity={0.6}
                            stroke='var(--color-failed)'
                            dataKey={"failed"}
                            stackId={"a"}
                        /> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default WeatherDetails;
