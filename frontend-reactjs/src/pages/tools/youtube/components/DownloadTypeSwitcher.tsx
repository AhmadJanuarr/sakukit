import { Button } from "@/shared/components/ui/Button";

interface DownloadTypeSwitcherProps {
  isSubmitting: boolean;
  isDownloading: boolean;
  selectedDownloadOption: "video" | "audio";
  setSelectedDownloadOption: (option: "video" | "audio") => void;
}

export const DownloadTypeSwitcher = ({
  selectedDownloadOption,
  setSelectedDownloadOption,
  isSubmitting,
  isDownloading,
}: DownloadTypeSwitcherProps) => {
  return (
    <div className="mb-4 flex w-full gap-2 sm:mb-6 sm:w-auto sm:justify-start">
      <Button
        type="button"
        disabled={isSubmitting || isDownloading}
        variant={selectedDownloadOption === "video" ? "default" : "outline"}
        onClick={() => setSelectedDownloadOption("video")}
      >
        Video
      </Button>
      <Button
        type="button"
        disabled={isSubmitting || isDownloading}
        variant={selectedDownloadOption === "audio" ? "default" : "outline"}
        onClick={() => setSelectedDownloadOption("audio")}
      >
        Audio
      </Button>
    </div>
  );
};
