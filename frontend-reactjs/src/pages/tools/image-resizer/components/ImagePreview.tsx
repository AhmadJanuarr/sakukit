import { useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImagePreviewProps {
  file: File;
  targetWidth?: number;
  targetHeight?: number;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: any) => void;
}

export const ImagePreview = ({ file, targetHeight, targetWidth, onCropComplete }: ImagePreviewProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const ratio = targetWidth && targetHeight ? targetWidth / targetHeight : 1;
  console.log(imageUrl);
  return (
    <div className="bg-base-primary relative h-full w-full overflow-hidden rounded-lg">
      {imageUrl ? (
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={ratio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      ) : null}
    </div>
  );
};
