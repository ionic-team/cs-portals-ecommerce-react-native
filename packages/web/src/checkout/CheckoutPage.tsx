import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import Portals from "@ionic/portals";
import { Address, CreditCard } from "@portals-ecommerce/shared";
import { useData } from "../shared/useData";
import { AddressItem, PaymentItem } from "../shared/components";

import "./CheckoutPage.css";

const CheckoutPage: React.FC = () => {
  const { cart, user, checkout } = useData();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [selectedCard, setSelectedCard] = useState<CreditCard>();
  const router = useIonRouter();

  useEffect(() => {
    if (user) {
      const address = user.addresses.find((x) => x.preferred);
      address && setSelectedAddress(address);
      const card = user.creditCards.find((x) => x.preferred);
      card && setSelectedCard(card);
    }
  }, [user]);

  const handleDismiss = async () => {
    await Portals.publish({ topic: "dismiss", data: "cancel" });
  };

  const handleOrder = async () => {
    const result = "success";
    await checkout({ result });
    await Portals.publish({ topic: "dismiss", data: result });
  };

  return (
    <IonPage id="checkout-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => handleDismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="none">
          <IonListHeader>Delivery</IonListHeader>
          {user.addresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              onAddressSelected={(address) => setSelectedAddress(address)}
              selectedId={selectedAddress?.id}
              user={user}
            />
          ))}
        </IonList>
        <IonButton
          expand="block"
          color="secondary"
          onClick={() => router.push("/address")}
        >
          New Address
        </IonButton>
        <IonList lines="none">
          <IonListHeader>Payment</IonListHeader>
          {user.creditCards.map((card) => (
            <PaymentItem
              key={card.id}
              creditCard={card}
              selectedId={selectedCard?.id}
              onPaymentSelected={(card) => setSelectedCard(card)}
              selectable={true}
            />
          ))}
        </IonList>
        <IonButton
          expand="block"
          color="secondary"
          onClick={() => router.push("/payment")}
        >
          New Payment Method
        </IonButton>
        <IonList lines="none">
          <IonListHeader>Review Total</IonListHeader>
          <IonItem>
            <IonLabel>${cart.subTotal} + Tax</IonLabel>
          </IonItem>
        </IonList>
        <IonButton
          className="order-button"
          expand="block"
          onClick={() => handleOrder()}
        >
          Place Your Order
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default CheckoutPage;
