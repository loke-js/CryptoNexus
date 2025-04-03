import React from "react";
import {WeatherData } from "../../../../store/slices/weatherSlice";
import { CryptoData } from "@/store/slices/cryptoSlice";
import { cn } from "@/lib/utils";
import { ArrowBigDownIcon, ArrowDown01, ArrowDownFromLineIcon, ArrowDownIcon, ArrowDownNarrowWideIcon, ArrowDownRightIcon, ArrowDownRightSquare, ArrowUpIcon, ArrowUpNarrowWideIcon, ArrowUpWideNarrowIcon, CircleArrowDownIcon } from "lucide-react";

interface CryptoCardProps {
  crypto:CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({crypto}) => {

    const {name,current_price,market_cap,market_cap_change_24h,image,price_change_24h} = crypto;
  return (
    <div className="dark:bg-ring/12 shadow-lg rounded-lg p-4 border border-border/40">
      <div className="flex items-center justify-between gap-1">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="flex flex-col items-center">
      <img src={image} className="w-14 h-14" alt="" />
      <div className="flex items-center">
      <h3 className={cn("text-", price_change_24h>0 ? "text-green":"text-destructive")}>{price_change_24h.toFixed(2)} </h3> 
      {price_change_24h>0? <ArrowUpWideNarrowIcon className="stroke-green-500"/> : <ArrowDownNarrowWideIcon className="stroke-destructive"/>}
      </div>
      </div>

      </div>
      <p className=" text-xl font-semibold"><span className="font-bold text-2xl">$</span> {current_price}</p>
      <p className="text-primary"></p>
    </div>
  );
};

export default CryptoCard;
