import { Cart, defaultCart } from '@portals-ecommerce/shared';

type Action =
  | { type: 'initialize'; id: number }
  | { type: 'addToBasket'; pid: number; price: number }
  | { type: 'addToQuantity'; pid: number; price: number }
  | { type: 'removeFromQuantity'; pid: number; price: number }
  | { type: 'removeFromBasket'; pid: number; price: number };

const reducer = (state: Cart, action: Action) => {
  switch (action.type) {
    case 'initialize':
      return { ...defaultCart, id: action.id };
    case 'addToBasket':
      const idx = state.basket.findIndex(
        ({ productId }) => productId === action.pid,
      );
      if (idx > -1) {
        state.basket.forEach((i) => i.productId === action.pid && i.quantity++);
      } else {
        state.basket.push({ productId: action.pid, quantity: 1 });
      }
      return { ...state, subTotal: state.subTotal + action.price };
    case 'addToQuantity':
      state.basket.forEach((i) => i.productId === action.pid && i.quantity++);
      return { ...state, subTotal: state.subTotal + action.price };
    case 'removeFromQuantity':
      state.basket.forEach((i) => i.productId === action.pid && i.quantity--);
      return { ...state, subTotal: state.subTotal - action.price };
    case 'removeFromBasket':
      const basket = state.basket.filter((p) => p.productId !== action.pid);
      return { ...state, subTotal: state.subTotal - action.price, basket };
    default:
      throw new Error();
  }
};
export default reducer;
