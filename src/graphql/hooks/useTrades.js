import { useQuery } from "@apollo/client";
import { TRADES } from "../queries/trades";

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

  return data?.trades;
};

export default useTrades;
