"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SparklesIcon, CloudSun, Newspaper } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen px-4">
      {/* 🔥 Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
        Stay Updated with Crypto, Weather & News 📢
      </h1>

      <p className="text-muted-foreground max-w-xl text-lg mb-6">
        Get real-time cryptocurrency insights, accurate weather forecasts, and
        the latest news updates—all in one place!
      </p>

      <Button className="mb-10">
        <SparklesIcon className="mr-2 h-4 w-4" />
        Explore Dashboard
      </Button>

      

      {/* 🚀 Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        {/* Crypto Section */}
        <div className="p-6 border rounded-lg shadow-md text-left bg-gray-100 dark:bg-gray-900">
          <div className="flex items-center space-x-3 mb-3">
            <SparklesIcon className="text-yellow-500 w-8 h-8" />
            <h2 className="text-2xl font-semibold">Crypto Market</h2>
          </div>
          <p className="text-muted-foreground">
            Live price tracking of Bitcoin, Ethereum, and many more. Get
            real-time updates and alerts on price movements.
          </p>
        </div>

        {/* Weather Section */}
        <div className="p-6 border rounded-lg shadow-md text-left bg-gray-100 dark:bg-gray-900">
          <div className="flex items-center space-x-3 mb-3">
            <CloudSun className="text-blue-500 w-8 h-8" />
            <h2 className="text-2xl font-semibold">Weather Updates</h2>
          </div>
          <p className="text-muted-foreground">
            Check accurate weather forecasts in your city. Get temperature,
            humidity, wind speed, and alerts.
          </p>
        </div>

        {/* News Section */}
        <div className="p-6 border rounded-lg shadow-md text-left bg-gray-100 dark:bg-gray-900">
          <div className="flex items-center space-x-3 mb-3">
            <Newspaper className="text-red-500 w-8 h-8" />
            <h2 className="text-2xl font-semibold">Latest News</h2>
          </div>
          <p className="text-muted-foreground">
            Stay informed with top news headlines from around the world. Get
            instant updates on breaking news.
          </p>
        </div>
      </div>
    </div>
  );
}
