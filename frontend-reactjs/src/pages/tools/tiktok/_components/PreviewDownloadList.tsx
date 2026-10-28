import { cn } from "@/shared/utils/class-names";
import { FormatOption } from "@/shared/types";
import { HTMLAttributes } from "react";
import { LuDownload, LuMusic, LuVideo } from "react-icons/lu";

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
    <div className={cn("w-full", className)} {...props}>
      <div className="mb-3 tracking-wider uppercase">Pilih Format Unduhan</div>
      <div className="grid grid-cols-1 gap-3">
        {formats?.map((format, idx) => {
          const isVideo = format.has_video;
          const Icon = isVideo ? LuVideo : LuMusic;
          const label = isVideo ? "Video (MP4)" : "Audio (MP3)";
          const isCurrentDownloading = downloadingFormatId === format.format_id;

          return (
            <button
              key={format.format_id || idx}
              onClick={() => onDownloadClick?.(format.format_id)}
              disabled={isDownloading}
              className={cn(
                "group relative flex items-center justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300",
                isCurrentDownloading
                  ? "border-action-primary bg-action-primary/5"
                  : "border-line-light bg-base-primary hover:bg-action-hover disabled:opacity-50",
              )}
            >
              {isCurrentDownloading && (
                <div
                  className="bg-action-primary/10 absolute inset-0 origin-left transition-all duration-300 ease-linear"
                  style={{ width: `${downloadProgress || 0}%` }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300",
                    isVideo ? "bg-action-primary text-base-secondary" : "bg-purple-100",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="text-base font-semibold">{label}</div>
                  <div className="mt-0.5 text-xs font-medium">
                    {format.quality || "Standard"}{" "}
                    {format.filesize ? ` • ${(format.filesize / 1024 / 1024).toFixed(1)} MB` : ""}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                {isCurrentDownloading ? (
                  <span className="text-action-primary min-w-[3ch] text-right text-sm font-bold">
                    {downloadProgress || 0}%
                  </span>
                ) : (
                  <div className="group-hover:bg-action-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:text-white dark:bg-gray-800">
                    <LuDownload className="h-5 w-5" />
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {(!formats || formats.length === 0) && (
          <div className="rounded-xl border border-dashed p-4 text-center text-sm">Tidak ada format yang tersedia.</div>
        )}
      </div>
    </div>
  );
};
