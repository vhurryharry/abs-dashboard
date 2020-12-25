import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import MainNavbar from "components/Navbars/MainNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterMain from "components/Footers/FooterMain.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

const Main = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <MainNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/blackhole" exact component={Maps} />
            <Route path="/stats" exact component={Settings} />
            <Route path="/trades" exact component={Tables} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
          <FooterMain />
        </div>
      </div>
    </>
  );
};

export default Main;
