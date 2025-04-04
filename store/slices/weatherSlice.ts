import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherDetails, Alert } from "../../types/weatherTypes";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export interface WeatherState {
  weatherDetails: WeatherDetails[]; // Stores multiple cities' weather data
  alerts: Alert[];
  favorites: WeatherDetails[]; // Stores favorite cities
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: WeatherState = {
  weatherDetails: [],
  alerts: [],
  favorites: [],
  loading: false,
  error: null,
};

// Fetch weather for predefined cities
export const fetchPredefinedCities = createAsyncThunk(
  "weather/fetchPredefinedCities",
  async (_, { rejectWithValue }) => {
    try {
      const cities = ["New York", "London", "Tokyo"];
      const weatherResponses = await Promise.all(
        cities.map((city) =>
          axios
            .get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=yes`)
            .then((res) => res.data)
        )
      );
      console.log(weatherResponses);
      return weatherResponses;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch predefined cities");
    }
  }
);

// Fetch weather for a user-requested city
export const fetchWeatherDetails = createAsyncThunk(
  "weather/fetchWeatherDetails",
  async (city: string, { rejectWithValue }) => {
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=yes`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleFavoriteWeather: (state, action) => {
      const index = state.favorites.findIndex((w) => w.location.name === action.payload.location.name);
      console.log(action.payload);
      if (index > -1) state.favorites.splice(index, 1);
      else state.favorites.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch predefined cities
      .addCase(fetchPredefinedCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPredefinedCities.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherDetails = action.payload.map((cityData: any) => ({
          location: cityData.location,
          current: cityData.current,
          forecast: cityData.forecast,
        }));
        state.alerts = action.payload.flatMap((cityData: any) => cityData.alerts.alert || []);
      })
      .addCase(fetchPredefinedCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch user-requested city
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherDetails = [...state.weatherDetails, {
          location: action.payload.location,
          current: action.payload.current,
          forecast: action.payload.forecast,
        }];
        state.alerts = [...state.alerts, ...(action.payload.alerts.alert || [])];
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavoriteWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
