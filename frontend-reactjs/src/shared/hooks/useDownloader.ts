import { toast } from "sonner";
import { InfoResponse } from "../types/downloader_option";
import { ClientFetching } from "../utils/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useDownloader = () => {
  const handleGetInfo = async (inputURL: string) => {
    const trimmedURL = inputURL.trim();
    if (!trimmedURL) {
      toast.error("Mohon masukkan tautan YouTube terlebih dahulu.");
      return null;
    }

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
    }
  };

  const handleDownload = (inputURL: string, formatID: string, extension: string, fileSize: number) => {
    if (!BASE_URL) throw new Error("VITE_BASE_URL belum dikonfigurasi");

    const queryParams = new URLSearchParams({
      inputURL,
      format_id: formatID,
      ext: extension,
    });

    if (fileSize && fileSize > 0) {
      queryParams.append("fileSize", Math.round(fileSize).toString());
    }

    const downloadURL = `${BASE_URL}downloader/download?${queryParams.toString()}`;
    const link = document.createElement("a");
    link.href = downloadURL;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    handleGetInfo,
    handleDownload,
  };
};
