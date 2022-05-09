import React, { createContext, useEffect, useState } from "react";
import { Cart, defaultCart, defaultUser, User } from "./models";
import { CheckoutResult, ShopAPI } from "./plugin";

export const DataContext = createContext<{
  loading: boolean;
  user?: User;
  setUserData: (user: User) => Promise<void>;
  cart?: Cart;
  checkout: (result: CheckoutResult) => Promise<void>;
  userPhoto?: string;
  setUserPhoto: (photo: string) => Promise<void>;
}>({
  loading: false,
  user: undefined,
  setUserData: () => {
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
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      ShopAPI.getUserDetails(),
      ShopAPI.getCart(),
      ShopAPI.getUserPicture(),
    ]).then((values) => {
      setUser(values[0]);
      setCart(values[1]);
      setPhoto(values[2].picture);
    });
    setLoading(false);
  }, []);

  const checkout = async (result: CheckoutResult) => {
    setLoading(true);
    await ShopAPI.checkoutResult(result);
    setLoading(false);
  };

  const setUserData = async (user: User) => {
    setLoading(true);
    await ShopAPI.updateUserDetails(user);
    setUser(user);
    setLoading(false);
  };

  const setUserPhoto = async (photo: string) => {
    setLoading(true);
    await ShopAPI.setUserPicture({ picture: photo });
    setPhoto(photo);
    setLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        user,
        setUserData,
        cart,
        checkout,
        userPhoto: photo,
        setUserPhoto,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
