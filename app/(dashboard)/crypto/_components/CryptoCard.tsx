import React from "react";
import { CryptoData, toggleFavoriteCrypto } from "@/store/slices/cryptoSlice";
import { cn } from "@/lib/utils";
import { ArrowBigDownIcon, ArrowDown01, ArrowDownFromLineIcon, ArrowDownIcon, ArrowDownNarrowWideIcon, ArrowDownRightIcon, ArrowDownRightSquare, ArrowUpIcon, ArrowUpNarrowWideIcon, ArrowUpWideNarrowIcon, CircleArrowDownIcon, Heart } from "lucide-react";
import { useAppDispatch } from "@/store/hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const dispatch = useAppDispatch();
  const { name, current_price, market_cap, market_cap_change_24h, image, price_change_24h } = crypto;
  const favorites = useSelector((state: RootState) => state.crypto.favorites);
  const isFavorite = favorites.some((fav) => fav.name === crypto.name);
  return (
    <div className="relative dark:bg-ring/12 shadow-lg rounded-lg p-4 border border-border/40">
      <div className="flex items-center justify-between gap-1">
        <Link
          href={`/crypto/${name.toLowerCase()}`}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
        <h1 className="text-4xl font-bold">{name}</h1>
        </Link>
        <div className="flex flex-col items-center justify-center">
          {/* Favorite Toggle Button */}
          <button
            onClick={() => dispatch(toggleFavoriteCrypto(crypto))}
            className="absolute top-3 right-3 focus:outline-none transition-transform transform active:scale-90 cursor-pointer"
          >
            <Heart
              size={24}
              className={`transition-colors duration-300 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
            />
          </button>
          <img src={image} className="w-14 h-14" alt="" />
          <div className="flex items-center">
            <h3 className={cn("text-", price_change_24h > 0 ? "text-green" : "text-destructive")}> <span className="font-bold text-xl">$</span>{price_change_24h.toFixed(2)} </h3>
            {price_change_24h > 0 ? <ArrowUpWideNarrowIcon className="stroke-green-500" /> : <ArrowDownNarrowWideIcon className="stroke-destructive" />}
          </div>

        </div>
      </div>
      <p className=" text-xl font-semibold"><span className="font-bold text-2xl">$</span> {current_price}</p>
      <p className="text-primary"></p>
    </div>
  );
};

export default CryptoCard;
