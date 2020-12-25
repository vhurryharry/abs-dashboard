import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardTrades from "components/Cards/CardTrades.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { useHistoricalData, useCommunityData } from "services/Market";

const Dashboard = () => {
  const { historicalData } = useHistoricalData();
  const { communityData } = useCommunityData();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart data={historicalData} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart data={historicalData} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardTrades />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic data={communityData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
