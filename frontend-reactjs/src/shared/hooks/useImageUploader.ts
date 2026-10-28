import { MAX_FILES } from "@/constants/image-uploader";
import { ChangeEvent, DragEvent, useState } from "react";
import { toast } from "sonner";
import { validateImageFiles } from "../utils/image-file-validation";
import { useSoundEffect } from "./useSoundEffect";

export const useImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingFileCount, setPendingFileCount] = useState(0);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const successSound = useSoundEffect("/sounds/succeed.mp3");
  const errorSound = useSoundEffect("/sounds/error.mp3");

  const addFiles = (incomingFiles: File[]) => {
    const { acceptedFiles, rejectedFiles } = validateImageFiles(incomingFiles, files);

    rejectedFiles.forEach(({ file, reason }) => {
      if (reason === "unsupported-format") {
        toast.error(`${file.name}: Format tidak didukung`);
      } else if (reason === "file-too-large") {
        toast.error(`${file.name}: Ukuran file melebihi batas`);
      } else if (reason === "duplicate") {
        toast.warning(`${file.name}: File sudah ditambahkan`);
      } else {
        toast.warning(`Maksimal ${MAX_FILES} gambar`);
      }
    });

    if (rejectedFiles.length > 0) errorSound.play();
    if (acceptedFiles.length === 0) return;

    setFiles((currentFiles) => [...currentFiles, ...acceptedFiles]);
    toast.success(`${acceptedFiles.length} gambar berhasil ditambahkan`);
    successSound.play();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success(`Gambar berhasil dihapus`);
    successSound.play();
  };

  const clearAllFiles = () => {
    setFiles([]);
    toast.success(`Semua gambar berhasil dihapus`);
    successSound.play();
  };

  const handleEventDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (e.dataTransfer.files.length > 0) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    } catch (error) {
      errorSound.play();
      console.error("Error in handleDrop:", error);
      toast.error("Terjadi kesalahan saat memproses file");
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    try {
      if (input.files?.length) addFiles(Array.from(input.files));
    } catch (error) {
      console.error("Error in handleChange:", error);
      toast.error("Terjadi kesalahan saat memproses file");
      errorSound.play();
    } finally {
      input.value = "";
    }
  };

  return {
    state: {
      files,
      setFiles,
      pendingFileCount,
      isProcessing,
      isUploadSuccessful,
    },
    actions: {
      addFiles,
      removeFile,
      clearAllFiles,
      handleEventDrop,
      handleFileInputChange,
      markUploadSuccessful: () => setIsUploadSuccessful(true),
    },
  };
};
