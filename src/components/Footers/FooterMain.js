import React from "react";

const FooterMain = () => {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4"> </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://absorber.finance/"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://info.uniswap.org/pair/0x39c99091c0883287fea9e2f33529a3b8eed289de"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-sync-alt text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/DeFi_Absorber"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://absorberprotocol.medium.com/"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-medium-m text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/AbsorberProtocol"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-telegram-plane text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/MK4s9vDGEY"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-discord text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://etherscan.io/token/0xf4c05296c449edcee3e3f1524fac919510b168a2"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-ethereum text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dextools.io/app/uniswap/pair-explorer/0x39c99091c0883287fea9e2f33529a3b8eed289de"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-tools text-gray-500 mr-2 text-sm"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterMain;
