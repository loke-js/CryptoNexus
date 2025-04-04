import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice'
import priceReducer from './slices/priceSlice'
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto : cryptoReducer,
    price_alert : priceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
