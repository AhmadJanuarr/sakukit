import { useImageUploader } from "@/shared/hooks/useImageUploader";
import { useModalStore } from "@/shared/stores/useModalStore";
import { getCroppedImg } from "@/shared/utils/crop-image";
import { useEffect, useState } from "react";

export const useImageResizer = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const { state, actions } = useImageUploader();

  useEffect(() => {
    if (state.file.length > 0) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(state.file[0]);
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalSize({ width: img.width, height: img.height });
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    } else {
      setWidth(0);
      setHeight(0);
      setOriginalSize(null);
      setCroppedAreaPixels(null);
    }
  }, [state.file]);

  const handleDownload = (blob: Blob, fileName: string) => {
    if (!(blob instanceof Blob)) {
      console.error("handleDownload: expected Blob, got", typeof blob);
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    closeModal();
    state.setFile([]);
    state.setIsUploadSuccessful(false);
    setCroppedAreaPixels(null);
  };

  const onCropComplete = (_: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  };

  const handleResize = async (file: File, height: number, width: number) => {
    if (!file || !croppedAreaPixels) return;

    setIsResizing(true);
    try {
      const imageSrc = URL.createObjectURL(file);

      const croppedBlob = await getCroppedImg({
        imageSrc: imageSrc,
        pixelCrop: croppedAreaPixels,
        targetWidth: width,
        targetHeight: height,
      });

      handleDownload(croppedBlob as Blob, `resized-${file.name.split(".")[0]}.jpg`);
      URL.revokeObjectURL(imageSrc);
      return croppedBlob;
    } catch (err) {
      console.error("Error dalam resize gambar:", err);
      return null;
    } finally {
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
