export interface CreditCard {
  id: number;
  company: "Visa";
  number: string;
  cvv: string;
  zip: string;
  expirationDate: string;
  preferred?: boolean;
}

export const defaultCreditCard: CreditCard = {
  id: 0,
  company: "Visa",
  cvv: "",
  expirationDate: "",
  number: "",
  zip: "",
  preferred: false,
};
