export interface CreditCard {
  id: number;
  company: "Visa";
  number: string;
  expirationDate: string;
  preferred?: boolean;
}
