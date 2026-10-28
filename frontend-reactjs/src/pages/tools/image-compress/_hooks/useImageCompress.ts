import { useImageUploader } from "@/shared/hooks/useImageUploader";
import { ClientFetching } from "@/shared/utils/api";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
interface CompressedImageProps {
  name: string;
  url: string;
  newSize: number;
  blob: Blob;
}
export const useImageCompress = () => {
  const [quality, setQuality] = useState<number>(70);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedResults, setCompressedResults] = useState<CompressedImageProps[]>([]);
  const { actions, state } = useImageUploader();
  const compressedFilesRef = useRef<File[]>([]);

  const startCompression = async () => {
    setIsCompressing(true);
    try {
      const tempResults = [];
      for (const originalFile of state.file) {
        const formData = new FormData();
        formData.append("file", originalFile);
        formData.append("quality", quality.toString());
        const blob = await ClientFetching<Blob>(`image/compress-image`, {
          method: "POST",
          body: formData,
          responseType: "blob",
        });
        const objectURL = URL.createObjectURL(blob);
        tempResults.push({
          name: `compressed-${originalFile.name}`,
          url: objectURL,
          newSize: blob.size,
          blob: blob,
        });
      }

      setCompressedResults(tempResults);
      compressedFilesRef.current = state.file;
      state.setIsUploadSuccessful(true);
    } catch (error) {
      console.log("Gagal Kompresi :", error);
    } finally {
      setIsCompressing(false);
    }
  };

  useEffect(() => {
    if (compressedResults.length > 0) {
      const newFiles = state.file.filter((f) => !compressedFilesRef.current.includes(f));
      setCompressedResults([]);
      state.setFile(newFiles);
      compressedFilesRef.current = [];
    }
  }, [state.file]);

  const handleUploadMore = () => {
    state.setFile([]);
    state.setIsUploadSuccessful(false);
  };

  const handleClearAll = () => {
    state.setFile([]);
    state.setIsUploadSuccessful(false);
    setCompressedResults([]);
    setQuality(70);
  };

  const handleDownloadSingle = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (compressedResults.length === 0) return;
    try {
      const zip = new JSZip();
      compressedResults.forEach((result) => {
        zip.file(result.name, result.blob);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      handleDownloadSingle(zipUrl, `compress-image-${Date.now()}.zip`);
      setTimeout(() => URL.revokeObjectURL(zipUrl), 100);
    } catch (error) {
      console.log("Gagal Membuat dan mendownload zip");
    }
  };
  return {
    state,
    actions,
    quality,
    isCompressing,
    compressedResults,
    setQuality,
    startCompression,
    handleDownloadSingle,
    handleDownloadAll,
    handleUploadMore,
    handleClearAll,
  };
};
