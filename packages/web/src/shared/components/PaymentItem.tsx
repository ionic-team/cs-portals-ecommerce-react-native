import React from "react";
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonButton,
  useIonRouter,
  IonChip,
} from "@ionic/react";
import { CreditCard } from "../models";

interface PaymentItemProps {
  creditCard: CreditCard;
  onPaymentSelected?: (payment: CreditCard) => void;
  selectable?: boolean;
  selectedId?: number;
}

export const PaymentItem: React.FC<PaymentItemProps> = ({
  creditCard,
  onPaymentSelected = () => {},
  selectable = true,
  selectedId,
}) => {
  const router = useIonRouter();

  const navigateToPayment = (e: any) => {
    e.stopPropagation();
    router.push(`/payment/${creditCard.id}`);
  };

  return (
    <IonItem
      button
      detail={false}
      key={creditCard.id}
      onClick={() =>
        creditCard.id !== selectedId && onPaymentSelected(creditCard)
      }
    >
      {selectable && (
        <IonCheckbox slot="start" checked={creditCard.id === selectedId} />
      )}
      <IonLabel className="ion-text-wrap">
        {creditCard.company} ending in {creditCard.number.slice(-4)}
      </IonLabel>
      {creditCard.preferred && <IonChip color="success">Default</IonChip>}
      <IonButton fill="clear" slot="end" onClick={(e) => navigateToPayment(e)}>
        Edit
      </IonButton>
    </IonItem>
  );
};
