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

const coingeckoApi = `https://api.coingecko.com/api/v3/coins/absorber?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
const ethplorerApi = `https://api.ethplorer.io`;

const useMarketInformation = () => {
  const [marketInformation, setMarketInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCoingeckoInfo = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(coingeckoApi)
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
        console.error(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (coingeckoApi) {
      updateMarketInformation();
      setInterval(updateMarketInformation, 600000);
    }
  }, []);

  return { marketInformation, error, loading };
};

export default useMarketInformation;
