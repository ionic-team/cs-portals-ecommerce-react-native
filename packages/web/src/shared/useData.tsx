import { useContext } from "react";
import { DataContext } from "./DataProvider";

export const useData = () => {
  const { loading, user, cart, checkout, setUserData, setStateData } =
    useContext(DataContext);

  if (DataContext === undefined)
    throw new Error("useData must be used within a DataProvider");

  return {
    loading,
    user,
    cart,
    checkout,
    setUserData,
    setStateData,
  };
};
