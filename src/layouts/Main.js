import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import MainNavbar from "components/Navbars/MainNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterMain from "components/Footers/FooterMain.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Blackhole from "views/admin/Blackhole.js";
import MyStats from "views/admin/MyStats.js";
import Trades from "views/admin/Trades.js";

const Main = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("mode") == "dark");

  useEffect(() => {
    localStorage.setItem("mode", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="text-gray-800">
        <Sidebar isDark={isDark} setIsDark={setIsDark} />
        <div className="relative md:ml-64 bg-gray-200">
          <MainNavbar isDark={isDark} setIsDark={setIsDark} />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full h-full -m-24">
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/blackhole" exact component={Blackhole} />
              <Route path="/stats" exact component={MyStats} />
              <Route path="/trades" exact component={Trades} />
              <Redirect from="*" to="/dashboard" />
            </Switch>
            <FooterMain />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
