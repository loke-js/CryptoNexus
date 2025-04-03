import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

// Define types
export  interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price_usd: number;
  percent_change_24h: number;
  market_cap_usd: number;
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
  const response = await axios.get<{ data: CryptoData[] }>(
    `https://pro-api.coingecko.com/api/v3/coins/id`,{
        headers:{accept: 'application/json', 'x-cg-api-key': 'CG-G7Q9h35nB9yKywxQ8z4gKVen'}
    }
  );
  console.log(response);
  return response.data.data;
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
