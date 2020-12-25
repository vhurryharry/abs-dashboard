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
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/DeFi_Absorber"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://absorberprotocol.medium.com/"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/AbsorberProtocol"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/MK4s9vDGEY"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
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
