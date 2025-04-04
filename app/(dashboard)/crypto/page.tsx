"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchCryptoData } from "../../../store/slices/cryptoSlice";
import CryptoCard from "./_components/CryptoCard";
import { Loader2Icon } from "lucide-react";
import Loader from "@/components/Loader";
import Link from "next/link";

const CryptoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading} = useSelector((state: RootState) => state.crypto);
   const favorites = useSelector((state: RootState) => state.crypto.favorites);
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-5xl font-bold  mb-4">CryptoPage</h1>
      <div>
        {favorites.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">⭐ Favorite Cities:</h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((fav) => (
                <Link
                  key={fav.name}
                  href={`/crypto/${fav.name.toLowerCase()}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {fav.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {loading && <Loader/>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((crypto, index) => (
          <CryptoCard key={index} crypto={crypto}/>
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;
