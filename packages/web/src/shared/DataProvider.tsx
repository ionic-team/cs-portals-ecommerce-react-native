import React, { createContext, useCallback, useState } from "react";
import {
  Cart,
  defaultCart,
  defaultUser,
  User,
  CheckoutResult,
} from "@portals-ecommerce/shared";

/**
 * REMIX!
 *
 * This provider needs to do different things:
 *
 * 1. get/set user
 * 2. get cart
 * 3. Update profile picture
 * 4. Checkout
 * 5. Set initial data
 *
 * */

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
    console.log(user);
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
    // Publish message to Portals
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
