import { Product } from "./models/Product";
import { User } from "./models/User";

export class ShopAPI {
  static getProducts(): Product[] {
    const res = require("./../assets/data.json");
    const { products } = res;
    return products.sort(() => 0.5 - Math.random());
  }

  static getUser(): User {
    const res = require("./../assets/data.json");
    return res.user;
  }
}
