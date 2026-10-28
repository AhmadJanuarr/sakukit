import { MAX_FILE_SIZE, MAX_FILES, SUPPORTED_FORMATS } from "@/constants/image-uploader";
import { ChangeEvent, DragEvent, useState } from "react";
import { toast } from "sonner";
import { useSoundEffect } from "./useSoundEffect";

export const useImageUploader = () => {
  const [file, setFile] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingFileCount, setPendingFileCount] = useState(0);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const succesSound = useSoundEffect("/sounds/succeed.mp3");
  const errorSound = useSoundEffect("/sounds/error.mp3");

  const processFiles = (incomingFiles: File[]) => {
    if (file.length + incomingFiles.length > MAX_FILES) {
      errorSound.play();
      toast.warning(`Maximal file hanya bisa ${MAX_FILES} gambar saja!`);
      return;
    }

    const existingNames = new Set(file.map((f) => f.name));
    let hasError = false;
    const duplicateNames: string[] = [];

    const validFiles = incomingFiles.filter((f) => {
      const isValidType = SUPPORTED_FORMATS.includes(f.type);
      const isValidSize = f.size <= MAX_FILE_SIZE;
      const isDuplicate = existingNames.has(f.name);
      if (!isValidType) {
        toast.error(`${f.name}: Format tidak didukung`);
        hasError = true;
      } else if (!isValidSize) {
        toast.error(`${f.name}: Ukuran file melebihi batas (Max ${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
        hasError = true;
      }
      return isValidType && isValidSize;
    });
    if (hasError) errorSound.play();
    if (validFiles.length === 0) return;

    const processDelay = Math.random() * (1000 - 500) + 500;
    setPendingFileCount(validFiles.length);
    setIsProcessing(true);

    setTimeout(() => {
      setFile((prev) => [...prev, ...validFiles]);
      setIsProcessing(false);
      setPendingFileCount(0);
      setIsUploadSuccessful(false);
      toast.success(`${validFiles.length} Gambar berhasil ditambahkan`);
      succesSound.play();
    }, processDelay);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    } catch (error) {
      errorSound.play();
      console.error("Error in handleDrop:", error);
      toast.error("Terjadi kesalahan saat memproses file");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(Array.from(e.target.files));
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
      toast.error("Terjadi kesalahan saat memproses file");
      errorSound.play();
    }
  };

  const handleRemove = (index: number) => {
    setFile((prev) => prev.filter((_, i) => i !== index));
    toast.success(`Image berhasil dihapus`);
    succesSound.play();
  };

  return {
    state: {
      file,
      isProcessing,
      pendingFileCount,
      isUploadSuccessful,
      setIsUploadSuccessful,
      setIsProcessing,
      setFile,
    },
    actions: { handleDrop, handleChange, handleRemove },
  };
};
