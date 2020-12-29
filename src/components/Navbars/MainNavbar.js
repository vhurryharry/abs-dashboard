import React from "react";

const Navbar = ({ isDark, setIsDark }) => {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4 my-4">
          {/* Brand */}
          <div className="md:flex hidden uppercase">
            <button
              type="button"
              className={`px-4 py-2 rounded border ${
                isDark ? "" : "bg-gray-100"
              }`}
              onClick={() => setIsDark(false)}
            >
              {" ☀ "}
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded border ml-2 ${
                !isDark ? "" : "bg-gray-100"
              }`}
              onClick={() => setIsDark(true)}
            >
              {" ☾ "}
            </button>
          </div>
          {/* Form */}
          <div className="md:flex hidden uppercase lg:ml-auto mr-3">
            <a
              className="bg-white text-black text-sm hidden lg:flex font-semibold py-2 px-4 rounded flex-row flex-wrap items-center shadow-lg"
              href="https://info.uniswap.org/pair/0x39c99091c0883287fea9e2f33529a3b8eed289de"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-30-px w-auto rounded-full align-middle border-none mr-2"
                src="images/uniswap.svg"
              />
              Uniswap
            </a>
          </div>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            {/* <UserDropdown /> */}
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;
