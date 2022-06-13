import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { User, Cart, defaultUser } from "@portals-ecommerce/shared";

import AddressPage from "./address/AddressPage";
import DebugPage from "./debug/DebugPage";
import UserDetailPage from "./user/UserDetailPage";
import PaymentPage from "./payment/PaymentPage";
import CheckoutPage from "./checkout/CheckoutPage";
import HelpPage from "./help/HelpPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";
import { useData } from "./shared/useData";

setupIonicReact();

export interface AppContext {
  startingRoute: string;
  user?: User;
  cart?: Cart;
}

const App: React.FC<{ context: AppContext }> = ({
  context: { startingRoute, user, cart },
}) => {
  const { setStateData } = useData();

  useEffect(() => {
    setStateData({ user, cart });
  }, [setStateData, user, cart]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            {startingRoute !== "/" ? (
              <Redirect to={startingRoute} />
            ) : (
              <DebugPage />
            )}
          </Route>
          <Route path="/address" exact component={AddressPage} />
          <Route path="/address/:id" exact component={AddressPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/help" exact component={HelpPage} />
          <Route path="/payment" exact component={PaymentPage} />
          <Route path="/payment/:id" component={PaymentPage} />
          <Route path="/user" exact component={UserDetailPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
