import React, { createContext, useEffect, useState } from "react";
import { Cart, defaultCart, defaultUser, User } from "./models";
import { CheckoutResult, ShopAPI } from "./plugin";

export const DataContext = createContext<{
  loading: boolean;
  user?: User;
  setUser: (user: User) => void;
  cart?: Cart;
  checkout: (result: CheckoutResult) => Promise<void>;
  userPhoto?: string;
  setUserPhoto: (photo: string) => void;
}>({
  loading: false,
  user: undefined,
  setUser: () => {
    throw new Error("Method not implemented");
  },
  cart: undefined,
  checkout: () => {
    throw new Error("Method not implemented");
  },
  userPhoto: undefined,
  setUserPhoto: () => {
    throw new Error("Method not implemented");
  },
});

export const DataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(defaultUser);
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      ShopAPI.getUserDetails(),
      ShopAPI.getCart(),
      ShopAPI.getUserPicture(),
    ]).then((values) => {
      setUser(values[0]);
      setCart(values[1]);
      setUserPhoto(values[2].picture);
    });
    setLoading(false);
  }, []);

  return (
    <DataContext.Provider
      value={{
        loading,
        user,
        setUser,
        cart,
        checkout: ShopAPI.checkoutResult,
        userPhoto,
        setUserPhoto,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
