import React from "react";
import { tokenBurnAddresses } from "services/constants";
import { useBlackholeInfo } from "services/Market";

// components

const CardBurnStats = () => {
  const { blackholeInfo, loading } = useBlackholeInfo();

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-4">
          <div className="text-center flex items-center justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Blackhole</h6>
          </div>
        </div>

        <div className="flex-auto px-8 py-10">
          <div className="text-sm px-6">
            <span className="font-bold">What is the Blackhole?</span>
            <ul>
              <li>
                - The blackhole is the Ethereum burn address where 445k RFI
                tokens were sent.
              </li>
              <li>
                - These tokens are out of circulation, but the address continues
                to earn fees with each transaction.
              </li>
              <li>
                - The blackhole consumes more fees and get larger over time.
              </li>
              <li>- Anyone can contribute to the Blackhole</li>
            </ul>
          </div>
          <div className="pt-6 overflow-x-auto">
            <table>
              <thead className="text-left">
                <tr>
                  <th className="px-6 p-2">No</th>
                  <th className="px-6 p-2">Burn Address</th>
                  <th className="px-6 p-2">Burned Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {blackholeInfo ? (
                  <>
                    {tokenBurnAddresses.map((address, index) => {
                      return (
                        <tr key={address}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-no-wrap p-2">
                            {index + 1}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-no-wrap p-2">
                            <a
                              href={`https://etherscan.io/address/${address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {address}
                            </a>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-no-wrap p-2">
                            {+blackholeInfo[address].toFixed(5)} ABS
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-bold whitespace-no-wrap p-2 text-right">
                        Total Burned Amount
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-bold whitespace-no-wrap p-2">
                        {blackholeInfo?.sum} ABS
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-bold whitespace-no-wrap p-2 text-right">
                        Avg Daily Burning Amount
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-bold whitespace-no-wrap p-2">
                        {blackholeInfo?.avg} ABS
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <i className="fas fa-spinner fa-spin"></i>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBurnStats;
