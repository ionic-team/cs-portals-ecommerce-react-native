import React from "react";
import ReactDOM from "react-dom";
import App, { AppContext } from "./App";
import Portals from "@ionic/portals";
import { Capacitor } from "@capacitor/core";

if (!Capacitor.isNativePlatform()) {
  (window as any).portalInitialContext = {
    value: { startingRoute: "/" },
  };
}

Portals.getInitialContext<AppContext>().then((context) => {
  ReactDOM.render(
    <React.StrictMode>
      <App context={context.value} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
