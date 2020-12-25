import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterInfo from "components/Footers/FooterInfo.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

const Info = () => {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + require("assets/img/uniswap.svg") + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterInfo absolute />
        </section>
      </main>
    </>
  );
};

export default Info;
