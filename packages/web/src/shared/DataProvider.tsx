import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { Cart, User, CheckoutResult, ShopAPI } from "@portals-ecommerce/shared";

export const DataContext = createContext<{
  cart: Cart | undefined;
  checkout: () => CheckoutResult;
  user: User | undefined;
  setUserData: (user: User) => void;
  setStateData: (opts: { user?: User; cart?: Cart }) => void;
}>({
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

type DataProviderProps = PropsWithChildren<unknown>;

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [cart, setCart] = useState<Cart>();

  const setStateData = useCallback((opts: { user?: User; cart?: Cart }) => {
    const { cart, user } = opts;
    user && setUser(user);
    cart && setCart(cart);
  }, []);

  const checkout = (): CheckoutResult => {
    setCart({ id: user!.id, subTotal: 0, basket: [] });
    return ShopAPI.checkout();
  };

  const setUserData = (user: User) => {
    setUser(user);
  };

  return (
    <DataContext.Provider
      value={{
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
