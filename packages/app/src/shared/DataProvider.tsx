/* eslint-disable no-spaced-func */
import React, { createContext, useEffect, useReducer, useState } from 'react';
import {
  Cart,
  User,
  ShopAPI,
  defaultCart,
  Product,
} from '@portals-ecommerce/shared';
import reducer from './CartReducer';

export const DataContext = createContext<{
  user: User | undefined;
  cart: Cart | undefined;
  addToCart: (product: Product) => void;
}>({
  user: undefined,
  cart: undefined,
  addToCart: () => {
    throw new Error('Method not Implemented');
  },
});

export const DataProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [cart, dispatch] = useReducer(reducer, defaultCart);

  useEffect(() => {
    setUser(ShopAPI.getUser());
    dispatch({ type: 'initialize', id: ShopAPI.getUser().id });
  }, []);

  const addToCart = (product: Product) => {
    const { id, price } = product;
    dispatch({ type: 'addToBasket', price, pid: id });
  };

  return (
    <DataContext.Provider value={{ cart, user, addToCart }}>
      {children}
    </DataContext.Provider>
  );
};
