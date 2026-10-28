import { useImageTool } from "@/shared/hooks/useImageTool";
import { ClientFetching } from "@/shared/utils/api";
import { DownloadFile } from "@/shared/utils/download-file";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";

interface CompressedImageResultProps {
  name: string;
  url: string;
  newSize: number;
  blob: Blob;
}
export const useImageCompress = () => {
  const [quality, setQuality] = useState<number>(70);
  const [compressedResults, setCompressedResults] = useState<CompressedImageResultProps[]>([]);
  const { actions, state } = useImageTool();
  const processId = useRef(0);

  useEffect(() => {
    processId.current += 1;
    setCompressedResults((prev) => {
      prev.forEach(({ url }) => URL.revokeObjectURL(url));
      return [];
    });
  }, [state.files]);

  const compressSingleFile = async (file: File, qualityValue: number): Promise<CompressedImageResultProps> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", qualityValue.toString());

    const blob = await ClientFetching<Blob>("image/compress-image", {
      method: "POST",
      body: formData,
      responseType: "blob",
    });

    return {
      name: `compressed-${file.name}`,
      url: URL.createObjectURL(blob),
      newSize: blob.size,
      blob,
    };
  };

  const processFiles = async () => {
    if (state.isProcessing || state.files.length === 0) return;
    const currentProcessId = ++processId.current;
    actions.setIsProcessing(true);
    try {
      const settled = await Promise.allSettled(state.files.map((file) => compressSingleFile(file, quality)));
      const results = settled.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));

      const failed = settled.find((result) => result.status === "rejected");

      if (currentProcessId !== processId.current) {
        results.forEach(({ url }) => URL.revokeObjectURL(url));
        return;
      }

      if (failed) {
        results.forEach(({ url }) => URL.revokeObjectURL(url));
        throw failed.reason;
      }

      setCompressedResults(results);
      actions.markUploadSuccessful();
    } catch (error) {
      console.error("Gagal melakukan kompresi:", error);
    } finally {
      if (currentProcessId === processId.current) {
        actions.setIsProcessing(false);
      }
    }
  };

  const handleClearAll = () => {
    actions.clearAllFiles();
    setCompressedResults([]);
    setQuality(70);
  };

  const handleDownloadSingle = (url: string, fileName: string) => {
    DownloadFile(url, fileName);
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
    state: {
      ...state,
      quality,
      compressedResults,
    },
    actions: {
      ...actions,
      setQuality,
      processFiles,
      handleDownloadSingle,
      handleDownloadAll,
      handleClearAll,
    },
  };
};
