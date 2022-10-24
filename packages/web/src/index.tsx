import React from "react";
import ReactDOM from "react-dom";
import App, { AppContext } from "./App";
import { getInitialContext } from "@ionic/portals";
import { ShopAPI } from "@portals-ecommerce/shared";
import { DataProvider } from "./shared/DataProvider";

const defaultContext: AppContext = {
  startingRoute: "/",
  user: ShopAPI.getUser(),
  cart: ShopAPI.getStubCart(),
};

const context = getInitialContext<AppContext>()?.value ?? defaultContext;

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App context={context} />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
