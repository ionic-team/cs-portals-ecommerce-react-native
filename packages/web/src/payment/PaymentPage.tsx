import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router";
import { CreditCard } from "@portals-ecommerce/shared";
import { useData } from "../shared/useData";

import "./PaymentPage.css";

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUserData } = useData();

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<CreditCard>({ mode: "onChange" });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [displayCard, setDisplayCard] = useState<CreditCard>();

  const router = useIonRouter();

  useEffect(() => {
    reset({ expirationDate: new Date(Date.now()).toISOString() });
    if (user && id) {
      const card = user.creditCards.find((x) => x.id === parseInt(id, 10));
      if (card) {
        setDisplayCard(card);
        reset(card);
        setIsEditing(true);
      }
    }
  }, [id, user, reset]);

  const save = async (data: CreditCard) => {
    let creditCards = user!.creditCards;
    let idx = id ? parseInt(id) : -1;

    if (!data.company) data.company = "Visa";

    if (data.preferred) {
      creditCards.map((x) => (x.preferred = false));
    }

    if (isEditing) {
      creditCards = creditCards.filter((x) => x.id! !== idx);
    } else {
      idx = (Math.max(...creditCards.map((x) => x.id!)) || 0) + 1;
    }
    creditCards.push({ ...data, id: idx });
    await setUserData({ ...user!, creditCards });
    reset();
    router.canGoBack() && router.goBack();
  };

  const formatDateDisplay = (str: string) => {
    const date = new Date(str);
    const [month, year] = [date.getMonth() + 1, date.getFullYear()];
    return `${month.toString().padStart(2, "0")}/${year}`;
  };

  return (
    <IonPage id="payment-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? "Edit" : "Add"} Payment Method</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="Cancel" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {displayCard && id && (
            <div>
              <IonItem lines="none">
                <IonText slot="start">{displayCard.company}</IonText>
              </IonItem>
              <IonItem lines="none">
                <IonText slot="start">Card last 4 digits</IonText>
                <IonText slot="end">{displayCard.number.slice(-4)}</IonText>
              </IonItem>
              <IonItem lines="none">
                <IonText slot="start">Card exp. date</IonText>
                <IonText slot="end">
                  {formatDateDisplay(displayCard.expirationDate)}
                </IonText>
              </IonItem>
            </div>
          )}
          <IonItem lines="none">
            <IonLabel position="stacked">Card Number</IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonInput
                  placeholder="Card Number"
                  type="number"
                  pattern="[0-9]"
                  maxlength={16}
                  value={value}
                  onIonChange={(e) => onChange(e.detail.value!)}
                  onBlur={() =>
                    setDisplayCard({ ...displayCard!, number: value })
                  }
                />
              )}
              control={control}
              name="number"
              rules={{ required: true, minLength: 16, maxLength: 16 }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonGrid className="ion-no-padding ion-padding-vertical">
              <IonRow>
                <IonCol size="9">
                  <IonLabel position="stacked">Exp. Date</IonLabel>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <>
                        <IonInput
                          id="exp-date"
                          value={formatDateDisplay(value)}
                        />
                        <IonModal trigger="exp-date" className="exp-date">
                          <IonContent>
                            <IonDatetime
                              min={new Date(Date.now()).toISOString()}
                              max="2040-12-31"
                              value={value}
                              presentation="month-year"
                              onIonChange={(e) => onChange(e.detail.value!)}
                              showDefaultButtons={true}
                            />
                          </IonContent>
                        </IonModal>
                      </>
                    )}
                    control={control}
                    name="expirationDate"
                    rules={{ required: true }}
                  />
                </IonCol>
                <IonCol>
                  <IonLabel position="stacked">CVV</IonLabel>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <IonInput
                        placeholder="XXX"
                        type="number"
                        pattern="[0-9]"
                        maxlength={16}
                        value={value}
                        onIonChange={(e) => onChange(e.detail.value!)}
                      />
                    )}
                    control={control}
                    name="cvv"
                    rules={{ required: true, minLength: 3, maxLength: 3 }}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem lines="none">
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
              name="zip"
              rules={{ required: true, minLength: 5 }}
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
            <IonText>Set as default payment method</IonText>
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
export default PaymentPage;
