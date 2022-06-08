import { Cart, defaultCart } from '@portals-ecommerce/shared';

type Action =
  | { type: 'initialize'; id: number }
  | { type: 'addToBasket'; pid: number; price: number }
  | { type: 'removeFromBasket'; pid: number }
  | { type: 'updateQuantity'; pid: number; quantity: number };

const reducer = (state: Cart, action: Action) => {
  switch (action.type) {
    case 'initialize':
      return { ...defaultCart, id: action.id };
    case 'addToBasket':
      const { price, pid } = action;
      const idx = state.basket.findIndex(({ productId }) => productId === pid);
      let basket = state.basket;
      if (idx > -1) {
        basket.forEach((item) => item.productId === pid && item.quantity++);
      } else {
        basket.push({ productId: pid, quantity: 1 });
      }
      return { ...state, subTotal: state.subTotal + price, basket };
    case 'removeFromBasket':
    case 'updateQuantity':
    default:
      throw new Error();
  }
};
export default reducer;
