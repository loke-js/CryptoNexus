"use client"

import Loader from '@/components/Loader';
import { fetchCryptoData } from '@/store/slices/cryptoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function page() {
    const { cryptoId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.crypto);
    const cryptoDetails = data.find((crypto) => crypto.name.toLowerCase() === cryptoId?.toString().toLowerCase())
    useEffect(() => {
        if (!cryptoId) return; // Prevent unnecessary calls
        if (!cryptoDetails) {
            dispatch(fetchCryptoData()); // Fetch if not in Redux
        }
    }, [cryptoId, cryptoDetails, dispatch]);
    
  return (
    <div>
        <h1 className="text-5xl font-bold  mb-4">CryptoPage</h1>
        {loading && <Loader />}
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div  className=" shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">{cryptoDetails?.name}</h2>
                <p>Rank: {cryptoDetails?.market_cap_rank}%</p>
                <p>Highest Price: ${cryptoDetails?.high_24h}</p>
                <p>Market Cap: ${cryptoDetails?.market_cap}</p>
            </div>
        </div>
    </div>
  )
}
