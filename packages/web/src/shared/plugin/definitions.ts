import { Cart, User } from "@portals-ecommerce/shared";

export interface CheckoutResult {
  result: "success" | "cancel" | "failure";
}

export interface UserPicture {
  picture: string;
}

export interface ShopAPIPlugin {
  getCart(): Promise<Cart>;
  getUserDetails(): Promise<User>;
  updateUserDetails(user: User): Promise<void>;
  checkoutResult(result: CheckoutResult): Promise<void>;
  getUserPicture(): Promise<UserPicture>;
  setUserPicture(picture: UserPicture): Promise<void>;
}
