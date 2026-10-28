import { cn } from "@/shared/utils/class-names";
import { FormatOption } from "@/shared/types";
import { HTMLAttributes } from "react";
import { LuDownload, LuImage, LuVideo } from "react-icons/lu";

interface PreviewDownloadListProps extends HTMLAttributes<HTMLDivElement> {
  formats?: FormatOption[];
  downloadingFormatId?: string | null;
  downloadProgress?: number;
  isDownloading?: boolean;
  onDownloadClick?: (formatId: string) => void;
}

export const PreviewDownloadList = ({
  className,
  formats,
  downloadingFormatId,
  downloadProgress,
  isDownloading,
  onDownloadClick,
  ...props
}: PreviewDownloadListProps) => {
  return (
    <div className={cn("mt-auto space-y-3", className)} {...props}>
      <div className="mb-2 text-xs font-bold tracking-wider uppercase">Pilih Format Unduhan</div>
      <div className="grid grid-cols-1 gap-3">
        {formats?.map((format, idx) => {
          const isVideo = format.has_video;
          const Icon = isVideo ? LuVideo : LuImage;
          const label = isVideo ? "Video (MP4)" : "Gambar / Audio";
          const isCurrentDownloading = downloadingFormatId === format.format_id;

          return (
            <button
              key={format.format_id || idx}
              onClick={() => onDownloadClick?.(format.format_id)}
              disabled={isDownloading}
              className={cn(
                "group relative flex items-center justify-between overflow-hidden rounded-xl border p-3 transition-all duration-300 md:p-4",
                isCurrentDownloading
                  ? "border-action-primary bg-action-primary/5"
                  : "border-line-light bg-base-primary hover:border-action-primary disabled:opacity-50",
              )}
            >
              {isCurrentDownloading && (
                <div
                  className="bg-action-primary/10 absolute inset-0 origin-left transition-all duration-300 ease-linear"
                  style={{ width: `${downloadProgress || 0}%` }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3 md:gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 md:h-12 md:w-12",
                    isVideo && "bg-action-primary text-base-primary",
                  )}
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="text-left">
                  <div className="line-clamp-1 text-sm">{label}</div>
                  <div className="mt-0.5 line-clamp-1 text-[11px] font-medium text-gray-500 md:text-xs">
                    {format.quality || "High Quality"}{" "}
                    {format.filesize ? ` • ${(format.filesize / 1024 / 1024).toFixed(1)} MB` : ""}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex shrink-0 items-center gap-3">
                {isCurrentDownloading ? (
                  <span className="text-action-primary min-w-[3ch] text-right text-xs font-bold md:text-sm">
                    {downloadProgress || 0}%
                  </span>
                ) : (
                  <div className="group-hover:bg-action-primary flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:text-white md:h-10 md:w-10 dark:bg-gray-800">
                    <LuDownload className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                )}
              </div>
            </button>
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
