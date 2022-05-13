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
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonPicker,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router";

import { Address, StateCodes } from "../shared/models";
import { useData } from "../shared/useData";

const AddressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUserData } = useData();

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<Address>({ mode: "onChange" });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [present] = useIonPicker();
  const router = useIonRouter();

  useEffect(() => {
    if (user && id) {
      const address = user.addresses.find((x) => x.id === parseInt(id, 10));
      if (address) {
        reset({
          id: address.id,
          street: address.street,
          postal: address.postal,
          city: address.city,
          state: address.state,
          preferred: address.preferred,
        });
        setIsEditing(true);
      }
    }
  }, [user, id, reset]);

  const pickStateCode = (handler: Function, val: string) => {
    present({
      buttons: [
        {
          text: "Confirm",
          handler: (e) => handler(e.StateCode.value),
        },
      ],
      columns: [
        {
          name: "StateCode",
          options: StateCodes.map((code) => ({ text: code, value: code })),
          selectedIndex: StateCodes.findIndex((x) => x === val),
        },
      ],
    });
  };

  const save = async (data: Address) => {
    let addresses = user.addresses;
    let idx = id ? parseInt(id) : -1;

    if (data.preferred) {
      addresses.map((x) => (x.preferred = false));
    }

    if (isEditing) {
      addresses = addresses.filter((x) => x.id! !== idx);
    } else {
      idx = (Math.max(...addresses.map((x) => x.id!)) || 0) + 1;
    }
    addresses.push({ ...data, id: idx });
    await setUserData({ ...user, addresses });
    reset();
    router.canGoBack() && router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? "Edit" : "Add"} Address</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="Cancel" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem lines="full">
            <IonLabel position="fixed">Full Name</IonLabel>
            <IonInput
              disabled
              value={`${user.firstName} ${user.lastName}`.trim()}
            ></IonInput>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed">Address</IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonInput
                  debounce={500}
                  onIonChange={(e) => onChange(e.detail.value!)}
                  value={value}
                />
              )}
              control={control}
              name="street"
              rules={{ required: true, minLength: 1 }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed">Zip Code</IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonInput
                  type="number"
                  pattern="[0-9]*"
                  debounce={500}
                  onIonChange={(e) => onChange(e.detail.value!)}
                  value={value}
                />
              )}
              control={control}
              name="postal"
              rules={{ required: true, minLength: 1 }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed">City</IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonInput
                  debounce={500}
                  onIonChange={(e) => onChange(e.detail.value!)}
                  value={value}
                />
              )}
              control={control}
              name="city"
              rules={{ required: true, minLength: 1 }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed">State</IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonInput
                  onIonChange={(e) => onChange(e.detail.value!)}
                  onClick={() => pickStateCode(onChange, value)}
                  debounce={500}
                  value={value}
                />
              )}
              control={control}
              name="state"
              rules={{ required: true }}
            />
          </IonItem>
          <IonItem lines="none">
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonCheckbox
                  checked={value}
                  onIonChange={() => onChange(!value)}
                />
              )}
              control={control}
              name="preferred"
            />
            <IonText>Set as default address</IonText>
          </IonItem>
        </IonList>
        <IonButton
          type="submit"
          disabled={!isValid}
          expand="block"
          onClick={handleSubmit((data) => save(data))}
        >
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AddressPage;
