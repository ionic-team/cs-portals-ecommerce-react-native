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
  clearCart: () => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (product: Product, action: 'add' | 'remove') => void;
  updateUser: (user: User) => void;
}>({
  user: undefined,
  cart: undefined,
  addToCart: () => {
    throw new Error('Method not Implemented');
  },
  clearCart: () => {
    throw new Error('Method not Implemented');
  },
  removeFromCart: () => {
    throw new Error('Method not Implemented');
  },
  updateQuantity: () => {
    throw new Error('Method not Implemented');
  },
  updateUser: () => {
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
    const { id: pid, price } = product;
    dispatch({ type: 'addToBasket', price, pid });
  };

  const removeFromCart = (product: Product) => {
    const { id: pid, price } = product;
    dispatch({ type: 'removeFromBasket', pid, price });
  };

  const updateQuantity = (product: Product, action: 'add' | 'remove') => {
    const { id: pid, price } = product;
    if (action === 'add') {
      dispatch({ type: 'addToQuantity', pid, price });
    } else {
      dispatch({ type: 'removeFromQuantity', pid, price });
    }
  };

  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const clearCart = () => dispatch({ type: 'clearBasket' });

  return (
    <DataContext.Provider
      value={{
        cart,
        user,
        addToCart,
        clearCart,
        removeFromCart,
        updateQuantity,
        updateUser,
      }}>
      {children}
    </DataContext.Provider>
  );
};
