import { useQuery } from "@apollo/client";
import { TRADES } from "../queries/trades";
import moment from "moment";

const useTrades = (skip = 0, first = 10) => {
  const variables = {
    first,
    skip,
  };

  const { data } = useQuery(TRADES, {
    variables,
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  return data?.trades?.map((trade) => {
    let type = "buy",
      absAmount = 0,
      ethAmount = 0,
      price = 0;

    trade = {
      ...trade,
      amount0In: parseFloat(trade.amount0In),
      amount0Out: parseFloat(trade.amount0Out),
      amount1In: parseFloat(trade.amount1In),
      amount1Out: parseFloat(trade.amount1Out),
      amountUSD: parseFloat(trade.amountUSD),
    };

    if (trade.pair.token0.symbol == "ABS") {
      if (trade.amount0In > 0) {
        type = "sell";
        absAmount = trade.amount0In;
        ethAmount = trade.amount1Out;
      } else {
        absAmount = trade.amount0Out;
        ethAmount = trade.amount1In;
      }
    } else {
      if (trade.amount1In > 0) {
        type = "sell";
        absAmount = trade.amount1In;
        ethAmount = trade.amount0Out;
      } else {
        absAmount = trade.amount1Out;
        ethAmount = trade.amount0In;
      }
    }
    price = absAmount ? trade.amountUSD / absAmount : 0;
    const txTime = new Date(parseInt(trade.transaction.timestamp) * 1000);

    return {
      ...trade,
      type,
      price,
      absAmount,
      ethAmount,
      time: moment(txTime).fromNow(),
    };
  });
};

export default useTrades;
