import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Main from "layouts/Main.js";
import Info from "layouts/Info.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Info} />
      <Route path="/" component={Main} />

      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
