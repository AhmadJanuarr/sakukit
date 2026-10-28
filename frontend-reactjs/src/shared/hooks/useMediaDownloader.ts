import { useDownloader } from "@/shared/hooks/useDownloader";
import { usePlatformValidator } from "@/shared/hooks/usePlatformValidator";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { FormatOption, InfoResponse } from "@/shared/types";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type DownloadOptions = "audio" | "video";
export type Platform = "youtube" | "tiktok" | "instagram";

export type FormValues = {
  inputURL: string;
};

const getExtension = (mimeType: string, fallback: string) => {
  return mimeType?.split(";")[0].split("/")[1] || fallback;
};

const getFilteredFormats = (formats: FormatOption[], selectedOption: DownloadOptions) => {
  if (!formats || formats.length === 0) return [];
  const uniqueFormats = new Map<string, FormatOption>();
  const isVideoOption = selectedOption === "video";

  formats.forEach((f: FormatOption) => {
    if (!f.quality) return;
    const matchesType = isVideoOption ? f.has_video : !f.has_video && f.has_audio;
    if (matchesType) {
      const mapKey = isVideoOption ? f.quality : getExtension(f.mime_type, "mp3");
      const existingFormat = uniqueFormats.get(mapKey);
      if (!existingFormat) {
        uniqueFormats.set(mapKey, f);
      } else {
        if (isVideoOption) {
          if (existingFormat.mime_type.includes("webm") && f.mime_type.includes("mp4")) {
            uniqueFormats.set(mapKey, f);
          }
        } else {
          const currentSize = f.filesize || 0;
          const existingSize = existingFormat.filesize || 0;
          if (currentSize > existingSize) {
            uniqueFormats.set(mapKey, f);
          }
        }
      }
    }
  });
  const results = Array.from(uniqueFormats.values());
  if (isVideoOption) {
    results.sort((a, b) => {
      const resA = parseInt(a.quality.replace(/\D/g, "")) || 0;
      const resB = parseInt(b.quality.replace(/\D/g, "")) || 0;
      return resB - resA;
    });
  }
  return results;
};

export const useMediaDownloader = (currentPlatform: Platform) => {
  const [activePreviewCard, setActivePreviewCard] = useState(false);
  const [info, setInfo] = useState<InfoResponse | null>(null);
  const [selectedDownloadOption, setSelectedDownloadOption] = useState<DownloadOptions>("video");

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const { handleGetInfo, handleDownload } = useDownloader();
  const { validateURL } = usePlatformValidator(currentPlatform);
  const successSound = useSoundEffect("/sounds/succeed.mp3");
  const form = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    const isValid = validateURL(values.inputURL);
    if (!isValid) return;
    setActivePreviewCard(false);
    setInfo(null);
    const response = await handleGetInfo(values.inputURL);
    if (response) {
      setActivePreviewCard(true);
      setInfo(response);
    }
  };

  const onDownloadClick = async (formatID: string) => {
    if (isDownloading) return;

    const inputURL = form.getValues("inputURL");

    let resultFormatId = formatID;
    if (currentPlatform === "youtube" && selectedDownloadOption === "video") {
      resultFormatId = `${formatID}+bestaudio`;
    }

    setIsDownloading(true);
    setDownloadingFormatId(formatID);
    setDownloadProgress(0);

    const progressInterval = setInterval(() => {
      setDownloadProgress((oldProgress) => {
        if (oldProgress >= 95) return 95;
        const increment = Math.floor(Math.random() * 5) + 3;
        return Math.min(oldProgress + increment, 95);
      });
    }, 400);

    try {
      await handleDownload(inputURL, resultFormatId);
      clearInterval(progressInterval);
      setDownloadProgress(100);
      if (successSound) {
        successSound.play();
      }

      toast.success("Download berhasil dimulai!");
    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      setDownloadProgress(0);
      toast.error("Gagal mengunduh file. Silakan coba lagi.");
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadingFormatId(null);
      }, 500);
    }
  };

  const filteredFormats = useMemo(() => {
    return getFilteredFormats(info?.formats || [], selectedDownloadOption);
  }, [info?.formats, selectedDownloadOption]);

  return {
    form,
    states: {
      activePreviewCard,
      info,
      selectedDownloadOption,
      isDownloading,
      downloadingFormatId,
      downloadProgress,
      filteredFormats,
    },
    actions: {
      setSelectedDownloadOption,
      onSubmit,
      onDownloadClick,
    },
  };
};
