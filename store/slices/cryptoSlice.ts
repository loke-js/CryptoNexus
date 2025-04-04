import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

// Define types
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO date string
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO date string
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string; // ISO date string
}


export  interface CryptoState {
  data: CryptoData[];
  favorites: CryptoData[];
  loading: boolean;
}

const initialState: CryptoState = {
  data: [],
  favorites: [],
  loading: false,
};

// Fetch cryptocurrency data
export const fetchCryptoData = createAsyncThunk("crypto/fetch", async () => {
  const coinIds = ["bitcoin", "ethereum", "solana"]; // Replace with any other coin you want
  const response = await axios.get<CryptoData[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc`,
    {
      headers: {
        accept: "application/json",
        "x-cg-api-key": API_KEY,
      },
    }
  );
  console.log(response.data);
  return response.data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    toggleFavoriteCrypto: (state, action: PayloadAction<CryptoData>) => {
      const index = state.favorites.findIndex((c) => c.id === action.payload.id);
      if (index > -1) state.favorites.splice(index, 1);
      else state.favorites.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavoriteCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
