import { useImageTool } from "@/shared/hooks/useImageTool";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { ConvertFile } from "@/shared/utils/convert-file";
import JSZip from "jszip";
import { useState } from "react";
import { toast } from "sonner";

export const useImageConverter = () => {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const { state, actions } = useImageTool();
  const succeedSound = useSoundEffect("/sounds/succeed.mp3");

  const handleFormatChange = (index: number, format: string) => {
    setSelectedFormats((current) => {
      const next = [...current];
      next[index] = format;
      return next;
    });
  };

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

  const convertSingle = async (file: File, format: string): Promise<Blob> => {
    const blob = await ConvertFile(file, format);
    handleDownload(blob, `converted-${file.name.replace(/\.[^.]+$/, "")}.${format}`);
    actions.markUploadSuccessful();
    return blob;
  };

  const createAndDownloadZip = async (files: Array<{ file: File; blob: Blob | null; format: string }>) => {
    const zip = new JSZip();
    files.forEach(({ file, blob, format }) => {
      if (blob) {
        const fileName = `converted-${file.name.split(".")[0]}.${format}`;
        zip.file(fileName, blob);
      }
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    handleDownload(zipBlob, `converted-images-${new Date().getTime()}.zip`);
  };

  const convertMultiple = async (
    files: File[],
    formats: string[],
  ): Promise<Array<{ file: File; blob: Blob | null; format: string }>> => {
    const results = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const format = formats[index] ?? "webp";
      try {
        const blob = await ConvertFile(file, format);
        results.push({ file, blob, format });
      } catch (error) {
        console.error(`Gagal mengonversi file ${file.name}:`, error);
        results.push({ file, blob: null, format });
      }
    }

    await createAndDownloadZip(results);
    actions.markUploadSuccessful();
    return results;
  };

  const processFiles = async () => {
    if (state.isProcessing || state.files.length === 0) return;
    actions.setIsProcessing(true);
    try {
      const formats = state.files.map((_, index) => selectedFormats[index] ?? "webp");
      if (state.files.length === 1) {
        await convertSingle(state.files[0], formats[0]);
      } else {
        await convertMultiple(state.files, formats);
      }
      toast.success("Gambar berhasil dikonversi");
      succeedSound.play();
    } finally {
      actions.setIsProcessing(false);
    }
  };

  return {
    state: {
      ...state,
      selectedFormats,
    },
    actions: {
      ...actions,
      processFiles,
      handleFormatChange,
      setSelectedFormats,
    },
  };
};
