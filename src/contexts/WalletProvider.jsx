import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import moneyData from "mocks/moneyData";
import { calcTotalMoney } from "helpers/calculateMoney";
import { MY_MONEY } from "constants/myWallet";

const example = {
  wallet: [
    {
      id: 1,
      type: "coin",
      money: 10,
      count: 0,
    },
    {
      id: 2,
      type: "coin",
      money: 50,
      count: 12,
    },
  ],
  machineMoney: [
    { id: 1, money: 10, count: 0 },
    { id: 2, money: 50, count: 0 },
  ],
  totalWalletMoney: 26_200,
  machineTotalMoney: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;

    case "USE_COIN":
      const coinState = state.map((coin) => {
        return coin.id === action.targetId ? { ...coin, count: coin.count-- } : coin;
      });

      return coinState;

    default:
      throw Error("WalletProvider action.type error");
  }
};

const WalletProvider = ({ children }) => {
  const [wallet, dispatch] = useReducer(reducer, []);
  const [coinInMachine, setCoinInMachine] = useState(moneyData);
  const [coinSum, setCoinSum] = useState(0);

  const fetchMyWallet = () => {
    const initData = moneyData.map((moneyItem, index) => {
      return { ...moneyItem, count: MY_MONEY[index].count };
    });

    dispatch({ type: "INIT", data: initData });
  };

  const setCoinWallet2Machine = (targetId) => {
    const newData = coinInMachine.map((coinItem) =>
      coinItem.id === targetId ? { ...coinItem, count: ++coinItem.count } : coinItem
    );
    setCoinInMachine(newData);
  };

  const onPushCoin = useCallback((targetId) => {
    dispatch({ type: "USE_COIN", targetId });
    setCoinWallet2Machine(targetId);
  }, []);

  const walletvalues = { wallet, coinSum, coinInMachine };

  const dispatches = useMemo(() => {
    return {
      onPushCoin,
    };
  }, []);

  useEffect(() => {
    fetchMyWallet();
  }, []);

  useEffect(() => {
    setCoinSum(calcTotalMoney(wallet));
  }, [wallet]);

  return (
    <WalletStateContext.Provider value={walletvalues}>
      <WalletDispatchContext.Provider value={dispatches}>{children}</WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  );
};

export const WalletStateContext = createContext();
export const WalletDispatchContext = createContext();
export default WalletProvider;
