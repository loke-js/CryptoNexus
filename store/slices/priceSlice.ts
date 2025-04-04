import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


interface PricesState {
  prices: { [key: string]: number }; // only used to track last CoinCap price
}

const initialState: PricesState = {
  prices: {},
};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ [key: string]: number }>) => {
      Object.entries(action.payload).forEach(([crypto, newPrice]) => {
        const oldPrice = state.prices[crypto];

        // If we don't have an old price yet, store and skip toast
        if (!oldPrice) {
          state.prices[crypto] = newPrice;
          return;
        }

        const priceChange = ((newPrice - oldPrice) / oldPrice) * 100;

        // Show toast for significant change (±2%)
        if ((priceChange) >= 2) {
          toast.success(`${crypto.toUpperCase()} moved by ${priceChange.toFixed(5)}%!`);
        }
        else if((priceChange) < -1){
            toast.error(`${crypto.toUpperCase()} moved by ${priceChange.toFixed(5)}%!`);
        }
        // Update price for next comparison
        state.prices[crypto] = newPrice;
      });
    },
  },
});

export const { updatePrices } = pricesSlice.actions;
export default pricesSlice.reducer;
