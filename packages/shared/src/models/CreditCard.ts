export interface CreditCard {
  id: number;
  company: "Visa";
  number: string;
  cvv: string;
  zip: string;
  expirationDate: string;
  preferred?: boolean;
}
