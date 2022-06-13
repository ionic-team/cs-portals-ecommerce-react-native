import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Camera, CameraDirection, CameraResultType } from "@capacitor/camera";
import Portals, { PortalSubscription } from "@ionic/portals";
import { useForm, Controller } from "react-hook-form";

import { useData } from "../shared/useData";
import { AddressItem, PaymentItem, ImageCropper } from "../shared/components";

import "./UserDetailPage.css";

interface UserDetail {
  firstName: string;
  lastName: string;
  email: string;
}

const UserDetailPage: React.FC = () => {
  const { user, setUserData } = useData();
  const { getValues, control, reset } = useForm<UserDetail>({
    mode: "onChange",
  });
  const router = useIonRouter();
  const [cameraImage, setCameraImage] = useState<string>("");
  const [showCropModal, hideCropModal] = useIonModal(
    <ImageCropper
      image={cameraImage}
      onCropComplete={async (dataImageUrl: string) => {
        //await setUserPhoto(dataImageUrl);
        setCameraImage("");
        hideCropModal();
      }}
      closeModal={() => hideCropModal()}
    />
  );

  useEffect(() => {
    user &&
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
  }, [user, reset]);

  const handlePictureClick = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      width: 300,
      direction: CameraDirection.Front,
      resultType: CameraResultType.Uri,
    });
    setCameraImage(image.webPath || "");
    showCropModal();
  };

  const updateUserData = async () => {
    const values = getValues();
    await setUserData({ ...user!, ...values });
  };

  return (
    <IonPage id="user-detail-page">
      <IonHeader>
        <IonToolbar color="white">
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-image" onClick={handlePictureClick}>
          <img src={""} alt={`${user?.firstName} ${user?.lastName}`} />
          <IonIcon icon={add} />
        </div>
        <div className="user-info">
          <IonList lines="full">
            <IonItem>
              <IonLabel position="fixed" text-wrap>
                First Name
              </IonLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onBlur={() => updateUserData()}
                    onIonChange={(e) => onChange(e.detail.value!)}
                    value={value}
                  />
                )}
                control={control}
                name="firstName"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="fixed" text-wrap>
                Last Name
              </IonLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onBlur={() => updateUserData()}
                    onIonChange={(e) => onChange(e.detail.value!)}
                    value={value}
                  />
                )}
                control={control}
                name="lastName"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="fixed" text-wrap>
                Email Address
              </IonLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onBlur={() => updateUserData()}
                    onIonChange={(e) => onChange(e.detail.value!)}
                    value={value}
                    type="email"
                  />
                )}
                control={control}
                name="email"
              />
            </IonItem>
          </IonList>
        </div>

        <div className="list-section">
          <IonList lines="none">
            <IonListHeader>Addresses</IonListHeader>
            {user?.addresses.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                selectable={false}
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
        </div>
        <div className="list-section">
          <h4>Payment Methods</h4>
          <IonList lines="none">
            {user?.creditCards.map((creditCard) => (
              <PaymentItem
                key={creditCard.id}
                creditCard={creditCard}
                selectable={false}
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
        </div>
      </IonContent>
    </IonPage>
  );
};
export default UserDetailPage;
