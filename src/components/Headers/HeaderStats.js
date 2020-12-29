import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { useMarketInformation } from "services/Market";

const HeaderStats = () => {
  const { marketInformation, loading } = useMarketInformation();

  return (
    <>
      {/* Header */}
      <div className="relative bg-gradient md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Market Cap"
                  statTitle={
                    "$" + marketInformation.marketCap?.toLocaleString()
                  }
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Price"
                  statTitle={"$" + marketInformation.price}
                  statArrow={marketInformation.priceChange > 0 ? "up" : "down"}
                  statIconName="fas fa-dollar-sign"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="24h Volume"
                  statTitle={"$" + marketInformation.volume}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Cir. Supply"
                  statTitle={marketInformation.circulatingSupply?.toLocaleString()}
                  statIconName="fas fa-database"
                  statIconColor="bg-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
