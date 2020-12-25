import React from "react";
import { Link } from "react-router-dom";
import useTrades from "graphql/hooks/useTrades";
import moment from "moment";

// components

const CardTrades = () => {
  const trades = useTrades(0, 5);
  console.log(trades);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                Recent Trades
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to="/trades"
              >
                See all
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Time
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  ABS Amount
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  ETH Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {trades &&
                trades.map((trade) => {
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
                  const txTime = new Date(
                    parseInt(trade.transaction.timestamp) * 1000
                  );

                  return (
                    <tr key={trade.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        <i
                          className={`fas ${
                            type == "buy"
                              ? "fa-arrow-up text-green-500"
                              : "fa-arrow-down text-red-500"
                          } mr-4`}
                        ></i>
                        ${+price.toFixed(8)}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {moment(txTime).fromNow()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {+absAmount.toFixed(8)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {+ethAmount.toFixed(8)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CardTrades;
