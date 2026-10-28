import { useDownloader } from "@/shared/hooks/useDownloader";
import { usePlatformValidator } from "@/shared/hooks/usePlatformValidator";
import { DownloadOptions, InfoResponse } from "@/shared/types/downloader_option";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getFilteredFormats } from "../utils/format-filter";
import { useModalStore } from "../stores/useModalStore";
import { DownloadSuccessModalContent } from "../components/DownloadSuccessModalContent";

export type Platform = "youtube" | "tiktok" | "instagram";

export type FormValues = {
  inputURL: string;
};

export const useMediaDownloader = (currentPlatform: Platform) => {
  const [activePreviewCard, setActivePreviewCard] = useState(false);
  const [info, setInfo] = useState<InfoResponse | null>(null);
  const [selectedDownloadOption, setSelectedDownloadOption] = useState<DownloadOptions>("video");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  const { openModal, closeModal } = useModalStore();

  const { handleGetInfo, handleDownload } = useDownloader();
  const { validateURL } = usePlatformValidator(currentPlatform);
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

  const onDownloadClick = async (formatID: string, extension: string, fileSize: number) => {
    if (isDownloading) return;
    const inputURL = form.getValues("inputURL");
    let resultFormatId = formatID;
    if (currentPlatform === "youtube" && selectedDownloadOption === "video") {
      resultFormatId = `${formatID}+bestaudio`;
    }

    setIsDownloading(true);
    setDownloadingFormatId(formatID);

    try {
      handleDownload(inputURL, resultFormatId, extension, fileSize);
      openModal({
        title: "Status Unduhan",
        content: (
          <DownloadSuccessModalContent
            currentPath={`/tools/${currentPlatform}`}
            onContinue={() => {
              closeModal();
              setIsDownloading(false);
              setDownloadingFormatId(null);
            }}
          />
        ),
        onClose: () => {
          setIsDownloading(false);
          setDownloadingFormatId(null);
        },
      });
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("Gagal mengunduh file. Silakan coba lagi.");
      setIsDownloading(false);
      setDownloadingFormatId(null);
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
      filteredFormats,
    },
    actions: {
      setSelectedDownloadOption,
      onSubmit,
      onDownloadClick,
    },
  };
};
