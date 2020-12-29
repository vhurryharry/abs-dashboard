import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.scss";
import "assets/styles/dark.scss";

// layouts

import Main from "layouts/Main.js";
import Info from "layouts/Info.js";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Web3Provider, { Connectors } from "web3-react";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [1] });
const connectors = { MetaMask };

ReactDOM.render(
  <Web3Provider connectors={connectors} libraryName="ethers.js">
    <ApolloProvider client={client}>
      <BrowserRouter basename={"/app"}>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} component={Main} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </Web3Provider>,
  document.getElementById("root")
);
