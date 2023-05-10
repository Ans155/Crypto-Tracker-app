import React from 'react';
import axios from "axios";
import { useEffect} from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import {CoinList } from './config/api';

const Crypto=createContext();

const CryptoContext = ({ children}) => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency]=useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const fetchCoins = async ()=> {
      setLoading(true);
      const{ data } =await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
      }, [currency]);

    
  return (
    <Crypto.Provider value={{currency,symbol,setCurrency,coins,loading,fetchCoins}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
  };