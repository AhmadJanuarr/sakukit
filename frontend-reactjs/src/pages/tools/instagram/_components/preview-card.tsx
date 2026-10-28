import * as React from "react";
import { cn } from "@/shared/utils/class-names";
import { Download, Image as ImageIcon, Video } from "lucide-react";
import { FormatOption } from "@/shared/types";

// --- Root Card ---
interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const PreviewCard = React.forwardRef<HTMLDivElement, PreviewCardProps>(
  ({ className, active, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden py-10 transition-all duration-500 ease-out",
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
        className,
      )}
      {...props}
    >
      <div className="bg-base-secondary border-line-strong flex flex-col gap-5 rounded-2xl border p-4 shadow-sm sm:p-5 md:flex-row md:gap-6 md:p-6 md:shadow-none">
        {children}
      </div>
    </div>
  ),
);
PreviewCard.displayName = "PreviewCard";

// --- Thumbnail ---
interface PreviewThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

const PreviewThumbnail = React.forwardRef<HTMLDivElement, PreviewThumbnailProps>(
  ({ className, src, alt, ...props }, ref) => (
    <div ref={ref} className={cn("flex w-full shrink-0 items-start md:w-[280px]", className)} {...props}>
      <div className="border-line-light relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5">
        <img src={src} alt={alt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
    </div>
  ),
);
PreviewThumbnail.displayName = "PreviewThumbnail";

// --- Content Wrapper ---
const PreviewContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-1 flex flex-1 flex-col justify-between py-0 md:mt-0 md:py-2", className)}
      {...props}
    />
  ),
);
PreviewContent.displayName = "PreviewContent";

// --- Info (Title & Author) ---
interface PreviewInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
}

const PreviewInfo = React.forwardRef<HTMLDivElement, PreviewInfoProps>(
  ({ className, title, author, ...props }, ref) => (
    <div ref={ref} className={cn("mb-5 space-y-2 md:mb-6 md:space-y-3", className)} {...props}>
      <h3 className="line-clamp-2 text-lg leading-snug font-bold text-balance md:text-left md:text-2xl md:leading-tight">
        {title || "Post Instagram"}
      </h3>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-action-primary bg-action-primary/10 rounded-full px-2.5 py-0.5 text-xs font-medium md:px-3 md:py-1 md:text-sm md:font-semibold">
          @{author || "Pengguna Instagram"}
        </span>
      </div>
    </div>
  ),
);
PreviewInfo.displayName = "PreviewInfo";

// --- Download List ---
interface PreviewDownloadListProps extends React.HTMLAttributes<HTMLDivElement> {
  formats?: FormatOption[];
  downloadingFormatId?: string | null;
  downloadProgress?: number;
  isDownloading?: boolean;
  onDownloadClick?: (formatId: string) => void;
}

const PreviewDownloadList = React.forwardRef<HTMLDivElement, PreviewDownloadListProps>(
  ({ className, formats, downloadingFormatId, downloadProgress, isDownloading, onDownloadClick, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto space-y-3", className)} {...props}>
      <div className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase md:mb-3 md:text-sm">
        Pilih Format Unduhan
      </div>
      <div className="grid grid-cols-1 gap-3">
        {formats?.map((format, idx) => {
          const isVideo = format.has_video;
          const Icon = isVideo ? Video : ImageIcon;
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
                  ? "border-action-primary bg-action-primary/5 shadow-sm"
                  : "border-line-light bg-base-primary hover:border-action-primary hover:shadow-md disabled:opacity-50",
              )}
            >
              {isCurrentDownloading && (
                <div
                  className="bg-action-primary/10 absolute inset-0 origin-left transition-all duration-300 ease-linear"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3 md:gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12",
                    isVideo
                      ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-900/30",
                  )}
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="text-left">
                  <div className="line-clamp-1 text-sm font-bold md:text-base">{label}</div>
                  <div className="mt-0.5 line-clamp-1 text-[11px] font-medium text-gray-500 md:text-xs">
                    {format.quality || "High Quality"}{" "}
                    {format.filesize ? ` • ${(format.filesize / 1024 / 1024).toFixed(1)} MB` : ""}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex shrink-0 items-center gap-3">
                {isCurrentDownloading ? (
                  <span className="text-action-primary min-w-[3ch] text-right text-xs font-bold md:text-sm">
                    {downloadProgress}%
                  </span>
                ) : (
                  <div className="group-hover:bg-action-primary flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:text-white md:h-10 md:w-10 dark:bg-gray-800">
                    <Download className="h-4 w-4 md:h-5 md:w-5" />
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
  ),
);
PreviewDownloadList.displayName = "PreviewDownloadList";

export { PreviewCard, PreviewThumbnail, PreviewContent, PreviewInfo, PreviewDownloadList };
