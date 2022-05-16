import { WebPlugin } from "@capacitor/core";
import { Cart, Data, User } from "../models";
import { CheckoutResult, ShopAPIPlugin, UserPicture } from "./definitions";

// This is an implementation that allows for usage when
// Capacitor recognizes it is being ran on the web platform.

// The following implementation are mocks to allow web developers
// to write their code outside of the native application.
export class ShopAPIPluginWeb extends WebPlugin implements ShopAPIPlugin {
  async getCart(): Promise<Cart> {
    await this.sleep(1000);
    return { id: 1, subTotal: 32.33, basket: [{ productId: 1, quantity: 1 }] };
  }

  async getUserDetails(): Promise<User> {
    const response = await fetch("/data.json");
    await this.sleep(1000);
    const data = (await response.json()) as Data;
    return data.user;
  }

  async updateUserDetails(user: User): Promise<void> {
    console.log("Method not implemented.");
  }

  async checkoutResult(result: CheckoutResult): Promise<void> {
    await this.sleep(1000);
    console.log("checkout", { result });
  }

  async getUserPicture(): Promise<UserPicture> {
    this.sleep(1000);
    return { picture: require("../../assets/images/jt-avatar.png") };
  }

  async setUserPicture(picture: UserPicture): Promise<void> {
    console.log("Method not implemented.");
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
