import gql from "graphql-tag";

export const TRADES = gql`
  query trades($first: Int, $skip: Int, $pair: String) {
    trades: swaps(
      first: $first
      skip: $skip
      where: { pair: $pair }
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
