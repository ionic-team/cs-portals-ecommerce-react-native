import { CheckoutResult, User } from "@portals-ecommerce/shared";

type Messages =
  | { topic: "cart:checkout"; data: CheckoutResult }
  | { topic: "user:updated"; data: User }
  | { topic: "modal:dismiss"; data: "success" | "cancel" };

export default Messages;
