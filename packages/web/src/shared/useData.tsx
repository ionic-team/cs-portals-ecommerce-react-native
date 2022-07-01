import { useContext } from "react";
import { DataContext } from "./DataProvider";

export const useData = () => {
  const { user, cart, checkout, setUserData, setStateData } =
    useContext(DataContext);

  if (DataContext === undefined)
    throw new Error("useData must be used within a DataProvider");

  return {
    user,
    cart,
    checkout,
    setUserData,
    setStateData,
  };
};
