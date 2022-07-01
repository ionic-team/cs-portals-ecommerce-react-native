export interface Cart {
  id: number;
  subTotal: number;
  basket: {
    productId: number;
    quantity: number;
  }[];
}

export const defaultCart: Cart = {
  id: -1,
  subTotal: 0.0,
  basket: [],
};
