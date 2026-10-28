import { useState } from "react";
import { toast } from "sonner";
import { InfoResponse } from "../types";
import { ClientFetching } from "../utils/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useDownloader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInfo = async (inputURL: string) => {
    const trimmedURL = inputURL.trim();
    if (!trimmedURL) {
      toast.error("Mohon masukkan tautan YouTube terlebih dahulu.");
      return null;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("inputURL", trimmedURL);
      const body = await ClientFetching<{ status: number; message: string; data: { info: InfoResponse } }>(
        "downloader/info",
        { method: "POST", body: formData },
      );
      return body.data.info;
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil informasi. Silakan periksa koneksi atau coba beberapa saat lagi.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (inputURL: string, formatID: string) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        inputURL: inputURL,
        format_id: formatID,
      });
      const downloadURL = `${BASE_URL}downloader/download?${queryParams.toString()}`;
      document.cookie = "download_ready=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = downloadURL;
      await new Promise<void>((resolve) => {
        const checkCookieInterval = setInterval(() => {
          if (document.cookie.includes("download_ready=1")) {
            clearInterval(checkCookieInterval);
            document.cookie = "download_ready=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            resolve();
          }
        }, 500);
        setTimeout(() => {
          clearInterval(checkCookieInterval);
          resolve();
        }, 60000);
      });
    } catch (error) {
      toast.error("Gagal mengunduh video. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleGetInfo,
    handleDownload,
  };
};
