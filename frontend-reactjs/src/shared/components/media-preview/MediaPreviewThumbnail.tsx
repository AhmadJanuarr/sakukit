import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ImgHTMLAttributes } from "react";

interface PreviewThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: "square" | "video";
  useProxy?: boolean;
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
}

export const MediaPreviewThumbnail = ({
  className,
  src,
  alt,
  aspectRatio = "square",
  useProxy = false,
  referrerPolicy,
  ...props
}: PreviewThumbnailProps) => {
  const imageSrc = src && useProxy ? `${import.meta.env.VITE_API_URL}proxy/image?url=${encodeURIComponent(src)}` : src;

  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-start sm:w-auto",
        aspectRatio === "video" ? "md:max-w-xl" : "sm:w-72",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "border-line-light relative flex w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5",
          aspectRatio === "video" ? "aspect-video md:max-w-xl" : "aspect-square w-full sm:w-72",
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={alt} className="h-full w-full object-cover" referrerPolicy={referrerPolicy} />
        ) : (
          <div className="bg-base-secondary h-full w-full animate-pulse" />
        )}
      </div>
    </div>
  );
};
