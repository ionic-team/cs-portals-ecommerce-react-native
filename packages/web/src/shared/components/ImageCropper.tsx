import React, { useEffect, useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImageCropperProps {
  image: string;
  onCropComplete: (dataImageUrl: string) => Promise<void>;
  closeModal: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  closeModal,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.addEventListener("crop", controlCropperSize);
      return () => cropper.removeEventListener("crop", controlCropperSize);
    }
  }, [cropperRef]);

  const controlCropperSize = (event: any) => {
    const imageElement: any = cropperRef.current;
    const cropper: any = imageElement?.cropper;
    const canvasData = cropper.getCanvasData();
    const cropBoxData = cropper.getCropBoxData();

    const canvasRight = canvasData.left + canvasData.width;
    const canvasBottom = canvasData.top + canvasData.height;
    const cropBoxRight = cropBoxData.left + cropBoxData.width;
    const cropBoxBottom = cropBoxData.top + cropBoxData.height;

    if (canvasData.width < cropBoxData.width) {
      const width = cropBoxData.width + 0.2;
      cropper.setCanvasData({ ...canvasData, width });
    } else if (canvasData.height < cropBoxData.height) {
      const height = cropBoxData.height + 0.2;
      cropper.setCanvasData({ ...canvasData, height });
    } else if (canvasData.left > cropBoxData.left) {
      const left = cropBoxData.left - 0.2;
      cropper.setCanvasData({ ...canvasData, left });
    } else if (canvasData.top > cropBoxData.top) {
      const top = cropBoxData.top - 0.2;
      cropper.setCanvasData({ ...canvasData, top });
    } else if (canvasRight < cropBoxRight) {
      const left = cropBoxRight - canvasData.width + 0.2;
      cropper.setCanvasData({ ...canvasData, left });
    } else if (canvasBottom < cropBoxBottom) {
      const top = cropBoxBottom - canvasData.height + 0.2;
      cropper.setCanvasData({ ...canvasData, top });
    }
    event.preventDefault();
  };

  const handleCropImage = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    onCropComplete(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adjust Image</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Cropper
          src={image}
          ref={cropperRef}
          initialAspectRatio={1}
          guides={true}
          aspectRatio={1}
          allowTransparency={false}
          background={false}
          dragMode="move"
          movable={true}
          autoCropArea={0.9}
          cropBoxMovable={false}
          cropBoxResizable={false}
        />
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={handleCropImage}>Done</IonButton>
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton onClick={closeModal}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};
