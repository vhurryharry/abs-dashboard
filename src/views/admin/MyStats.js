import React from "react";

// components

import CardUserProfile from "components/Cards/CardUserProfile.js";

const MyStats = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardUserProfile />
        </div>
      </div>
    </>
  );
};

export default MyStats;
