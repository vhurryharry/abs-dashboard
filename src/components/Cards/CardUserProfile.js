import React, { useEffect } from "react";
import { MetaMaskButton } from "rimble-ui";
import { useAccountInfo } from "services/Market";
import { useWeb3Context } from "web3-react";
import { ethers, BigNumber } from "ethers";

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
            <h6 className="text-gray-800 text-xl font-bold">My account</h6>
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
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {context.account && accountInfo && (
            <div>
              <p className="my-4 text-md leading-relaxed text-gray-800">
                ETH Balance:{" "}
                <span className="text-gray-800 text-md font-bold">
                  {accountInfo.eth.balance.toLocaleString() + " ETH"}
                </span>
              </p>
              <p className="my-4 text-md leading-relaxed text-gray-800">
                ABS Balance:{" "}
                <span className="text-gray-800 text-md font-bold">
                  {accountInfo.abs.balance.toLocaleString() + " ABS"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardUserProfile;
