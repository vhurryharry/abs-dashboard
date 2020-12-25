import gql from "graphql-tag";

export const TRADES = gql`
  query trades($first: Int, $skip: Int) {
    trades: swaps(
      first: $first
      skip: $skip
      where: { pair: "0x39c99091c0883287fea9e2f33529a3b8eed289de" }
      orderBy: timestamp
      orderDirection: desc
    ) {
      transaction {
        id
        timestamp
      }
      id
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
    }
  }
`;
