import React, { createContext, useCallback, useState } from "react";
import { Cart, User, CheckoutResult } from "@portals-ecommerce/shared";
import Portals from "@ionic/portals";

export const DataContext = createContext<{
  loading: boolean;
  cart: Cart | undefined;
  checkout: (result: CheckoutResult) => Promise<void>;
  user: User | undefined;
  setUserData: (user: User) => void;
  setStateData: (opts: { user?: User; cart?: Cart }) => void;
}>({
  loading: false,
  cart: undefined,
  user: undefined,
  checkout: () => {
    throw new Error("Method not implemented");
  },
  setUserData: () => {
    throw new Error("Method not implemented");
  },
  setStateData: () => {
    throw new Error("Method not implemented");
  },
});

export const DataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [cart, setCart] = useState<Cart>();

  const setStateData = useCallback((opts: { user?: User; cart?: Cart }) => {
    setLoading(true);
    const { cart, user } = opts;
    user && setUser(user);
    cart && setCart(cart);
    setLoading(false);
  }, []);

  const checkout = async (result: CheckoutResult) => {
    setLoading(true);
    // Publish message to Portals
    setLoading(false);
  };

  const setUserData = (user: User) => {
    setLoading(true);
    setUser(user);
    Portals.publish<User>({ topic: "user:updated", data: user });
    setLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        user,
        cart,
        checkout,
        setUserData,
        setStateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
