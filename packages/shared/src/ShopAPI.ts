import { Product } from "./models/Product";

export class ShopAPI {
  static getProducts(): Product[] {
    const res = require("./../assets/data.json");
    const { products } = res;
    return products.sort(() => 0.5 - Math.random());
  }
}
