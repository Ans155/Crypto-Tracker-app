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
    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "success",
    });
    const [user, setUser] = useState(null);
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
    <Crypto.Provider value={{
      currency,
      symbol,
      setCurrency,
      coins,
      loading,
      fetchCoins,
      alert,
      setAlert,
      user,
      }}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
  };