import { AppDispatch } from "../store/store";
import { updatePrices } from "../store/slices/priceSlice";

let socket: WebSocket | null = null;

export const startWebSocket = (dispatch: AppDispatch) => {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin");

  socket.onopen = () => {
    console.log("🔌 WebSocket Connected to CoinCap");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    dispatch(updatePrices(data));
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("❌ WebSocket Disconnected");
    socket = null;
  };
};

export const stopWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
