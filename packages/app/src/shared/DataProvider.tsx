import React, { createContext, useEffect, useState } from 'react';
import {
  Cart,
  User,
  defaultUser,
  defaultCart,
  ShopAPI,
} from '@portals-ecommerce/shared';

export const DataContext = createContext<{
  user: User;
  cart: Cart;
}>({
  user: defaultUser,
  cart: defaultCart,
});

export const DataProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [cart, setCart] = useState<Cart>(defaultCart);

  useEffect(() => {
    setUser(ShopAPI.getUser());
    setCart({ ...defaultCart, id: ShopAPI.getUser().id });
  }, []);

  return (
    <DataContext.Provider value={{ cart, user }}>
      {children}
    </DataContext.Provider>
  );
};
