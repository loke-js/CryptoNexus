// components/providers/WebSocketProvider.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { startWebSocket } from "@/lib/startWebSocket";

export const WebSocketProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    startWebSocket(dispatch);
  }, [dispatch]);

  return null; // it doesn't render anything
};
