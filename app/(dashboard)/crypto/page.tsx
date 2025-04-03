"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchCryptoData } from "../../../store/slices/cryptoSlice";
import CryptoCard from "./_components/CryptoCard";
import { Loader2Icon } from "lucide-react";
import Loader from "@/components/Loader";

const CryptoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading} = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold  mb-4">CryptoPage</h1>

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
