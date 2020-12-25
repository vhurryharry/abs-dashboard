// Copyright (C) 2020 Cartesi Pte. Ltd.

// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU General Public License for more details.

import { useEffect, useState } from "react";
import axios from "axios";

import { tokenAddress, tokenBurnAddresses, ethplorerApiKey } from "./constants";

const coingeckoApi = `https://api.coingecko.com/api/v3/coins/absorber`;
const ethplorerApi = `https://api.ethplorer.io`;

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

  const getCoingeckoInfo = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${coingeckoApi}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        .then(({ data }) => {
          resolve(data.market_data);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  const getTokenHolders = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${ethplorerApi}/getTopTokenHolders/${tokenAddress}?apiKey=${ethplorerApiKey}&limit=1000`
        )
        .then(({ data }) => {
          resolve(data.holders);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  const getUniV2Info = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${ethplorerApi}/getAddressInfo/${tokenAddress}?apiKey=${ethplorerApiKey}`
        )
        .then(({ data }) => {
          const uniToken = data.tokens.find(
            (token) => token.tokenInfo.symbol == "UNI-V2"
          );
          resolve(uniToken);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

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

  const getHistoricalData = (currency = "usd") => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${coingeckoApi}/market_chart?vs_currency=${currency}&days=7&interval=daily`
        )
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

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

  const getCommunityData = (currency = "usd") => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${coingeckoApi}?localization=false&tickers=false&market_data=false&community_data=true&developer_data=false&sparkline=false`
        )
        .then(({ data }) => {
          resolve(data.community_data);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

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

  const getAccountInfo = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${ethplorerApi}/getAddressInfo/${address}?apiKey=${ethplorerApiKey}`
        )
        .then(({ data }) => {
          resolve({
            abs: data.tokens.find((token) => token.tokenInfo.symbol == "ABS"),
            eth: data.ETH,
          });
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  const updateAccountInfo = () => {
    setLoading(true);
    setError("");

    Promise.all([getAccountInfo()])
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
