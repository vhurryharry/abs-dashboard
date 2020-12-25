import { useEffect, useState } from "react";
import moment from "moment";

import { tokenBurnAddresses, uniswapPairAddress } from "./constants";

import {
  getCoingeckoInfo,
  getTokenHolders,
  getUniV2Info,
  getHistoricalData,
  getCommunityData,
  getAccountInfo,
  getTransactionHistory,
} from "./utils";

export const useMarketInformation = () => {
  const [marketInformation, setMarketInformation] = useState({
    price: 0,
    volume: 0,
    priceChange: 0,
    marketCap: 0,
    circulatingSupply: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateMarketInformation = () => {
    setLoading(true);
    setError("");

    Promise.all([getCoingeckoInfo(), getTokenHolders(), getUniV2Info()])
      .then((results) => {
        setError("");
        const contractBurnRate =
          results[2].balance / results[2].tokenInfo.totalSupply;
        const uniswapBalance = results[1].find(
          (holder) => holder.address == results[2].tokenInfo.address
        ).balance;
        const contractBurnAmount = (uniswapBalance * contractBurnRate) / 1e18;

        const circSupply =
          results[1].reduce(
            (prev, cur) =>
              prev +
              (tokenBurnAddresses.includes(cur.address)
                ? 0
                : cur.balance / 1e18),
            0
          ) - contractBurnAmount;

        const price = +results[0].current_price.usd.toFixed(4);

        setMarketInformation({
          price: price,
          volume: results[0].total_volume.usd.toLocaleString(),
          priceChange: results[0].price_change_percentage_24h.toFixed(2),
          marketCap: circSupply * price,
          circulatingSupply: circSupply,
        });
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateMarketInformation();
    setInterval(updateMarketInformation, 600000);
  }, []);

  return { marketInformation, error, loading };
};

export const useHistoricalData = () => {
  const [historicalData, setHistoricalData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateHistoricalData = () => {
    setLoading(true);
    setError("");

    Promise.all([getHistoricalData()])
      .then((results) => {
        setHistoricalData({
          usd: results[0],
        });
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateHistoricalData();
    setInterval(updateHistoricalData, 24 * 60 * 60 * 1000);
  }, []);

  return {
    historicalData,
    loading,
    error,
  };
};

export const useCommunityData = () => {
  const [communityData, setCommunityData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateCommunityData = () => {
    setLoading(true);
    setError("");

    Promise.all([getCommunityData()])
      .then((results) => {
        setCommunityData(results[0]);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateCommunityData();
    setInterval(updateCommunityData, 24 * 60 * 60 * 1000);
  }, []);

  return {
    communityData,
    loading,
    error,
  };
};

export const useAccountInfo = (address = "") => {
  const [accountInfo, setAccountInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateAccountInfo = () => {
    setLoading(true);
    setError("");

    Promise.all([getAccountInfo(address), getTransactionHistory(address)])
      .then((results) => {
        const accountInfo = {
          abs: {
            ...results[0].abs,
            balance: +(results[0].abs.balance / 1e18).toFixed(5),
          },
          eth: {
            ...results[0].eth,
            balance: +results[0].eth.balance.toFixed(5),
          },
          operations: results[1].map((operation) => {
            let type = operation.type;
            if (type == "transfer") {
              if (operation.from == uniswapPairAddress) {
                type = "buy";
              } else if (operation.to == uniswapPairAddress) {
                type = "sell";
              } else if (tokenBurnAddresses.includes(operation.to)) {
                type = "burn";
              }
            }

            return {
              ...operation,
              value: +(operation.value / 1e18).toFixed(8),
              type,
              time: moment(new Date(operation.timestamp * 1000)).fromNow(),
            };
          }),
        };
        setAccountInfo(accountInfo);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (address && address !== "") {
      updateAccountInfo();
      setInterval(updateAccountInfo, 60000);
    }
  }, [address]);

  return {
    accountInfo,
    loading,
    error,
  };
};

export const useBlackholeInfo = () => {
  const [blackholeInfo, setBlackholeInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateBlackholeInfo = () => {
    setLoading(true);
    setError("");

    Promise.all([
      getAccountInfo(tokenBurnAddresses[0]),
      getAccountInfo(tokenBurnAddresses[1]),
      getTransactionHistory(tokenBurnAddresses[0]),
    ])
      .then((results) => {
        const balance = +(
          results[0].abs.balance / 1e18 +
          results[1].abs.balance / 1e18
        ).toFixed(5);
        const operations = results[2].map((operation) => ({
          ...operation,
          value: +(operation.value / 1e18).toFixed(8),
          time: moment(new Date(operation.timestamp * 1000)).fromNow(),
        }));
        const newBlackholeInfo = {
          balance: balance,
          operations: operations,
        };
        setBlackholeInfo(newBlackholeInfo);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateBlackholeInfo();
    setInterval(updateBlackholeInfo, 60000);
  }, []);

  return {
    blackholeInfo,
    loading,
    error,
  };
};
