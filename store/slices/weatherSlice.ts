import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// Define types
export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    };
}


export interface WeatherState {
    data: WeatherData[];
    favorites: WeatherData[];
    loading: boolean;
}

const initialState: WeatherState = {
    data: [],
    favorites: [],
    loading: false,
};

// Fetch weather data for predefined cities
export const fetchWeather = createAsyncThunk("weather/fetch", async () => {
    const cities = ["New York", "London", "Tokyo"];
    const weatherResponses = await Promise.all(
        cities.map((city) =>
            axios
                .get<WeatherData>(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
                .then((res) => res.data)
        )
    );
    console.log(weatherResponses);
    return weatherResponses;
});

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        toggleFavoriteWeather: (state, action: PayloadAction<WeatherData>) => {
            const index = state.favorites.findIndex((w) => w.location.name === action.payload.location.name);
            if (index > -1) state.favorites.splice(index, 1);
            else state.favorites.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { toggleFavoriteWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
