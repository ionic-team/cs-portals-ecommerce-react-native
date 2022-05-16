export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postal: string;
  preferred?: boolean;
}
