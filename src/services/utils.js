import { tokenAddress, ethplorerApiKey } from "./constants";
import axios from "axios";

const coingeckoApi = `https://api.coingecko.com/api/v3/coins/absorber`;
const ethplorerApi = `https://api.ethplorer.io`;

export const getCoingeckoInfo = () => {
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

export const getTokenHolders = () => {
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

export const getUniV2Info = () => {
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

export const getHistoricalData = (currency = "usd") => {
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

export const getCommunityData = () => {
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

export const getAccountInfo = (address) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${ethplorerApi}/getAddressInfo/${address}?apiKey=${ethplorerApiKey}`
      )
      .then(({ data }) => {
        resolve({
          abs: data.tokens.find(
            (token) => token.tokenInfo.address == tokenAddress
          ),
          eth: data.ETH,
        });
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};

export const getTransactionHistory = (address) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${ethplorerApi}/getAddressHistory/${address}?apiKey=${ethplorerApiKey}&token=${tokenAddress}`
      )
      .then(({ data }) => {
        resolve(data.operations);
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};
