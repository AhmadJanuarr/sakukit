import { useImageUploader } from "@/shared/hooks/useImageUploader";
import { useModalStore } from "@/shared/stores/useModalStore";
import { getCroppedImg } from "@/shared/utils/crop-image";
import { DownloadBlob } from "@/shared/utils/download-file";
import { useEffect, useState } from "react";
import { Area, Point } from "react-easy-crop";

export const useImageResizer = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const { state, actions } = useImageUploader();

  useEffect(() => {
    const file = state.files[0];
    if (!file) {
      setWidth(0);
      setHeight(0);
      setOriginalSize(null);
      setCroppedAreaPixels(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setOriginalSize({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      setWidth(0);
      setHeight(0);
      setOriginalSize(null);
    };

    img.src = objectUrl;
    return () => URL.revokeObjectURL(objectUrl);
  }, [state.files]);

  const handleClearAll = () => {
    closeModal();
    state.setFiles([]);
    actions.markUploadSuccessful();
    setCroppedAreaPixels(null);
  };

  const onCropComplete = (_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  };

  const handleResize = async (file: File, height: number, width: number) => {
    if (!file || !croppedAreaPixels) return;
    const imageSrc = URL.createObjectURL(file);
    setIsResizing(true);
    try {
      const imageSrc = URL.createObjectURL(file);

      const croppedBlob = await getCroppedImg({
        imageSrc: imageSrc,
        pixelCrop: croppedAreaPixels,
        targetWidth: width,
        targetHeight: height,
      });

      DownloadBlob(croppedBlob as Blob, `resized-${file.name.split(".")[0]}.jpg`);
      URL.revokeObjectURL(imageSrc);
      return croppedBlob;
    } catch (err) {
      console.error("Error dalam resize gambar:", err);
      return null;
    } finally {
      URL.revokeObjectURL(imageSrc);
      setIsResizing(false);
    }
  };

  return {
    state,
    actions,
    width,
    height,
    originalSize,
    isResizing,
    setWidth,
    setHeight,
    handleResize,
    handleClearAll,
    onCropComplete,
  };
};
