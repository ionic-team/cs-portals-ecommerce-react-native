import { Address } from "./Address";
import { CreditCard } from "./CreditCard";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  addresses: Address[];
  creditCards: CreditCard[];
}

export const defaultUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  addresses: [],
  creditCards: [],
};
