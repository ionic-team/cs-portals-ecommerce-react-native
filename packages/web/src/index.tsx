import React from "react";
import ReactDOM from "react-dom";
import App, { AppContext } from "./App";
import Portals from "@ionic/portals";
import { Capacitor } from "@capacitor/core";
import { ShopAPI } from "@portals-ecommerce/shared";

import { DataProvider } from "./shared/DataProvider";

if (!Capacitor.isNativePlatform()) {
  (window as any).portalInitialContext = {
    value: {
      startingRoute: "/",
      user: ShopAPI.getUser(),
      cart: ShopAPI.getStubCart(),
    },
  };
}

Portals.getInitialContext<AppContext>().then((context) => {
  ReactDOM.render(
    <React.StrictMode>
      <DataProvider>
        <App context={context.value} />
      </DataProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
