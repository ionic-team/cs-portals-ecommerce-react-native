import React from "react";
import {
  IonButton,
  IonCheckbox,
  IonChip,
  IonItem,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import { Address, User } from "@portals-ecommerce/shared";

interface AddressItemProps {
  address: Address;
  onAddressSelected?: (address: Address) => void;
  selectable?: boolean;
  selectedId?: number;
  user: User;
}

export const AddressItem: React.FC<AddressItemProps> = ({
  address,
  onAddressSelected = () => {},
  selectable = true,
  selectedId,
  user,
}) => {
  const router = useIonRouter();

  const navigateToAddress = (e: any) => {
    e.stopPropagation();
    router.push(`/address/${address.id}`);
  };

  return (
    <IonItem
      button
      detail={false}
      onClick={() => address.id !== selectedId && onAddressSelected(address)}
    >
      {selectable && (
        <IonCheckbox slot="start" checked={address.id === selectedId} />
      )}
      <IonLabel className="ion-text-wrap">
        {user.firstName} {user.lastName} <br />
        {address.street} <br />
        {address.city}, {address.state} {address.postal}
      </IonLabel>
      {address.preferred && <IonChip color="success">Default</IonChip>}
      <IonButton fill="clear" slot="end" onClick={(e) => navigateToAddress(e)}>
        Edit
      </IonButton>
    </IonItem>
  );
};
