import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonPicker,
} from "@ionic/react";
import React, { useState } from "react";
import { Address, defaultAddress, StateCodes, User } from "../shared/models";

const AddressPage: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    firstName: "Eric",
    lastName: "Horodyski",
    email: "eric@ionic.io",
    image: "data:abd",
    addresses: [],
    creditCards: [],
  });
  // REMOVE ABOVE CODE

  const [address, setAddress] = useState<Address>(defaultAddress);
  const [present] = useIonPicker();

  const pickStateCode = () => {
    present({
      buttons: [
        {
          text: "Confirm",
          handler: (e) => setAddress({ ...address, state: e.StateCode.value }),
        },
      ],
      columns: [
        {
          name: "StateCode",
          options: StateCodes.map((code) => ({ text: code, value: code })),
          selectedIndex: StateCodes.findIndex((x) => x === address.state),
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Address</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="Cancel" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="fixed">Full Name</IonLabel>
          <IonInput
            placeholder=""
            disabled
            value={`${user?.firstName} ${user?.lastName}`.trim()}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="fixed">Address</IonLabel>
          <IonInput
            placeholder=""
            debounce={500}
            onIonChange={(event) => {
              setAddress({ ...address, street: event.detail.value! });
            }}
            value={address.street}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="fixed">Zip Code</IonLabel>
          <IonInput
            placeholder=""
            type="number"
            pattern="[0-9]*"
            debounce={500}
            onIonChange={(e) =>
              setAddress({ ...address, postal: e.detail.value! })
            }
            value={address.postal}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="fixed">City</IonLabel>
          <IonInput
            placeholder=""
            debounce={500}
            onIonChange={(e) =>
              setAddress({ ...address, city: e.detail.value! })
            }
            value={address.city}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="fixed">State</IonLabel>
          <IonInput
            placeholder=""
            onClick={pickStateCode}
            value={address.state}
          />
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox
            checked={address.preferred}
            onIonChange={() =>
              setAddress({ ...address, preferred: !address.preferred })
            }
          />
          <IonText>Set as default address</IonText>
        </IonItem>
        <IonButton expand="block" onClick={() => {}}>
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AddressPage;
