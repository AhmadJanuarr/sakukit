interface getCroppedImgProps {
  imageSrc: string;
  pixelCrop: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  targetWidth?: number;
  targetHeight?: number;
}

export async function getCroppedImg({ imageSrc, pixelCrop, targetWidth, targetHeight }: getCroppedImgProps) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context adalah null");

  const dWidth = targetWidth || pixelCrop.width;
  const dHeight = targetHeight || pixelCrop.height;

  canvas.width = dWidth;
  canvas.height = dHeight;

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, dWidth, dHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas kosong"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.95,
    );
  });
}
