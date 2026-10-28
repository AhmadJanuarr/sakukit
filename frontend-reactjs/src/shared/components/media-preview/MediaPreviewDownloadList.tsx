import { cn } from "@/shared/utils/class-names";
import { FormatOption } from "@/shared/types/downloader_option";
import { HTMLAttributes } from "react";
import { LuDownload, LuImage, LuMusic, LuVideo } from "react-icons/lu";
import { Button } from "../ui/Button";
import { FormatBytes } from "@/shared/utils/format-bytes";
import { getFormatExtension } from "@/shared/utils/format-extension";

interface PreviewDownloadListProps extends HTMLAttributes<HTMLDivElement> {
  formats?: FormatOption[];
  downloadingFormatId?: string | null;
  isDownloading?: boolean;
  nonVideoLabel?: string;
  nonVideoIcon?: "image" | "music";
  fallbackQuality?: string;
  onDownloadClick?: (formatId: string, extension: string, fileSize: number) => void;
}

export const MediaPreviewDownloadList = ({
  className,
  formats,
  downloadingFormatId,
  isDownloading,
  onDownloadClick,
  nonVideoLabel = "Gambar / Audio",
  nonVideoIcon = "image",
  fallbackQuality = "High Quality",
  ...props
}: PreviewDownloadListProps) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="mb-2 text-xs font-bold tracking-wider uppercase">Pilih Format Unduhan</div>
      <div className="grid grid-cols-1 gap-3">
        {formats?.map((format, idx) => {
          const fileSize = FormatBytes(format.filesize ?? format.filesize_approx);
          const extension = getFormatExtension(format.mime_type, "video");
          const isVideo = format.has_video;
          const Icon = isVideo ? LuVideo : nonVideoIcon === "music" ? LuMusic : LuImage;
          const label = isVideo ? "Video (MP4)" : nonVideoLabel;
          const isCurrentDownloading = downloadingFormatId === format.format_id;

          return (
            <div
              key={format.format_id || idx}
              className={cn(
                "relative box-border flex items-center justify-between overflow-hidden rounded-lg border p-2 transition-all duration-300",
                isCurrentDownloading
                  ? "border-action-primary"
                  : "border-line-strong hover:bg-base-secondary disabled:opacity-50",
              )}
            >
              <div className="relative z-10 flex items-center gap-3 md:gap-4">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg border transition-transform duration-300 md:size-12",
                    isVideo && "bg-sky-200",
                  )}
                >
                  <Icon className="text-ink-primary size-6" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-medium">{label}</div>
                  <div className="text-sm">
                    {format.quality || fallbackQuality} {fileSize}
                  </div>
                </div>
              </div>
              <Button
                variant={isCurrentDownloading ? "default" : "outline"}
                onClick={() =>
                  onDownloadClick?.(format.format_id, extension, format.filesize ?? format.filesize_approx)
                }
                disabled={!onDownloadClick || isDownloading}
                className="relative z-10 h-full items-center gap-3"
              >
                {isCurrentDownloading ? (
                  <span className="text-right text-xs font-bold md:text-sm">Membuka...</span>
                ) : (
                  <div className="p-2">
                    <LuDownload className="size-5" />
                  </div>
                )}
              </Button>
            </div>
          );
        })}

        {(!formats || formats.length === 0) && (
          <div className="rounded-xl border border-dashed p-4 text-center text-sm text-gray-500">
            Tidak ada format yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
};
