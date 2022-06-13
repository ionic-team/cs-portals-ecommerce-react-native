import React, { createContext, useState } from "react";
import {
  Cart,
  defaultCart,
  defaultUser,
  User,
  CheckoutResult,
} from "@portals-ecommerce/shared";

export const DataContext = createContext<{
  loading: boolean;
  user: User;
  setUserData: (user: User) => void;
  cart: Cart;
  checkout: (result: CheckoutResult) => Promise<void>;
  userPhoto?: string;
  setUserPhoto: (photo: string) => Promise<void>;
}>({
  loading: false,
  user: defaultUser,
  setUserData: () => {
    throw new Error("Method not implemented");
  },
  cart: defaultCart,
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
  const [photo, setPhoto] = useState<string>(
    require("@portals-ecommerce/shared/assets/images/default-profile.png")
  );

  const checkout = async (result: CheckoutResult) => {
    setLoading(true);
    //await ShopAPI.checkoutResult(result);
    setLoading(false);
  };

  const setUserData = (user: User) => {
    setLoading(true);
    setUser(user);
    console.log(user);
    setLoading(false);
  };

  const setUserPhoto = async (photo: string) => {
    setLoading(true);
    //await ShopAPI.setUserPicture({ picture: photo });
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
