import React, { useEffect } from "react";
import { MetaMaskButton } from "rimble-ui";
import { useAccountInfo } from "services/Market";
import { useWeb3Context } from "web3-react";

// components

const CardUserProfile = () => {
  const context = useWeb3Context();
  const { accountInfo } = useAccountInfo(context.account);

  const connectNetwork = () => {
    context.setFirstValidConnector(["MetaMask"]);
  };

  useEffect(() => {
    connectNetwork();
  }, []);

  useEffect(() => {
    if (!context.account) {
      context.unsetConnector();
    }
  }, [context.account]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-4">
          <div className="text-center flex items-center justify-between">
            <h6 className="text-gray-800 text-xl font-bold">My Stats</h6>
            {context.account ? (
              <h6 className="text-gray-800 text-md font-bold">
                {context.account}
              </h6>
            ) : (
              <MetaMaskButton.Outline onClick={connectNetwork}>
                Connect with MetaMask
              </MetaMaskButton.Outline>
            )}
          </div>
        </div>
        <div className="flex-auto px-8 py-3">
          {context.account && accountInfo && (
            <div className="flex flex-row items-center">
              <p className="my-4 text-md leading-relaxed text-gray-800">
                ETH Balance:{" "}
                <span className="text-gray-800 text-md font-bold">
                  {accountInfo.eth.balance.toLocaleString() + " ETH"}
                </span>
              </p>
              <p className="my-4 text-md leading-relaxed text-gray-800 pl-4">
                ABS Balance:{" "}
                <span className="text-gray-800 text-md font-bold">
                  {accountInfo.abs.balance.toLocaleString() + " ABS"}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-gray-800"}>
                ABS Transactions (recent 10 transactions)
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Type
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Time
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Amount
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  From
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  To
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {accountInfo &&
                accountInfo.operations &&
                accountInfo.operations.map((tx) => {
                  return (
                    <tr key={tx.transactionHash}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 uppercase font-bold">
                        {tx.type}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {tx.time}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {tx.value.toLocaleString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <a
                          href={`https://etherscan.io/address/${tx.from}`}
                          className={
                            tx.from?.toLowerCase() ==
                            context?.account?.toLowerCase()
                              ? "font-bold"
                              : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tx.from}
                        </a>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <a
                          href={`https://etherscan.io/address/${tx.to}`}
                          className={
                            tx.to?.toLowerCase() ==
                            context?.account?.toLowerCase()
                              ? "font-bold"
                              : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tx.to}
                        </a>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <a
                          href={`https://etherscan.io/tx/${tx.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tx.transactionHash}
                        </a>
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

export default CardUserProfile;
