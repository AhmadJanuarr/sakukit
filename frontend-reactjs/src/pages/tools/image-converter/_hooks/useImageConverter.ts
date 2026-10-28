import { useImageUploader } from "@/shared/hooks/useImageUploader";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import JSZip from "jszip";
import { ClientFetching } from "@/shared/utils/api";

const API_URL = import.meta.env.VITE_API_URL;

//Logic Spesifik Image Converter
export const useImageConverter = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("webp");
  const { state, actions } = useImageUploader();
  const succeedSound = useSoundEffect("/sounds/succeed.mp3");

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

  const handleAddMoreImages = (e: ChangeEvent<HTMLInputElement>) => {
    actions.handleChange(e);
  };

  const handleConvertAgain = () => {
    state.setFile([]);
    state.setIsUploadSuccessful(false);
  };

  const handleClearAll = () => {
    state.setFile([]);
    state.setIsUploadSuccessful(false);
  };

  const convertSingle = useCallback(async (file: File, format: string): Promise<Blob | null> => {
    setIsConverting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);

      const blob = await ClientFetching<Blob>("image/convert", {
        method: "POST",
        body: formData,
        responseType: "blob",
      });
      if (blob) {
        handleDownload(blob, `converted-${file.name.split(".")[0]}.${format}`);
        state.setIsUploadSuccessful(true);
        return blob;
      }
      return null;
    } catch (err) {
      console.error("Error dalam konversi gambar:", err);
      return null;
    } finally {
      setIsConverting(false);
    }
  }, []);

  const createAndDownloadZip = async (files: Array<{ file: File; blob: Blob | null }>, format: string) => {
    const zip = new JSZip();
    files.forEach(({ file, blob }) => {
      if (blob) {
        const fileName = `converted-${file.name.split(".")[0]}.${format}`;
        zip.file(fileName, blob);
      }
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    handleDownload(zipBlob, `converted-images-${new Date().getTime()}.zip`);
  };

  const convertMultiple = useCallback(
    async (files: File[], format: string): Promise<Array<{ file: File; blob: Blob | null }>> => {
      setIsConverting(true);
      try {
        const results: Array<{ file: File; blob: Blob | null }> = [];

        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("format", format);

          try {
            const blob = await ClientFetching<Blob>("image/convert", {
              method: "POST",
              body: formData,
              responseType: "blob",
            });
            results.push({ file, blob });
          } catch (error) {
            console.error(`Gagal mengonversi file ${file.name}:`, error);
            results.push({ file, blob: null });
          }
        }

        await createAndDownloadZip(results, format);
        return results;
      } catch (err) {
        console.error("Error dalam konversi gambar:", err);
        return [];
      } finally {
        state.setIsUploadSuccessful(true);
        setIsConverting(false);
      }
    },
    [],
  );

  const handleConvert = async () => {
    if (state.file.length === 1) {
      await convertSingle(state.file[0], selectedFormat);
      toast.success("Gambar berhasil dikonversi");
      succeedSound.play();
    } else if (state.file.length > 1) {
      await convertMultiple(state.file, selectedFormat);
      toast.success("Gambar berhasil dikonversi");
      succeedSound.play();
    }
  };
  return {
    state,
    actions,
    isConverting,
    selectedFormat,
    setSelectedFormat,
    handleConvert,
    handleConvertAgain,
    handleAddMoreImages,
    handleClearAll,
  };
};
