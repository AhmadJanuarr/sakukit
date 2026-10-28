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
    <div className="mb-5 flex w-full gap-2 md:mb-6 md:w-auto md:justify-start md:gap-4">
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
