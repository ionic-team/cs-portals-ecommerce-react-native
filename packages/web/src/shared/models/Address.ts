export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postal: string;
  preferred?: boolean;
}

export const defaultAddress: Address = {
  id: 0,
  city: "",
  postal: "",
  state: "",
  street: "",
  preferred: false,
};
