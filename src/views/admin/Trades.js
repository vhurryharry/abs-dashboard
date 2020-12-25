import React from "react";

// components

import CardTradesTable from "components/Cards/CardTradesTable.js";

const Trades = () => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTradesTable />
        </div>
      </div>
    </>
  );
};

export default Trades;
