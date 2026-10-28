import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface PreviewThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export const PreviewThumbnail = ({ className, src, alt, ...props }: PreviewThumbnailProps) => {
  return (
    <div className={cn("flex max-w-md shrink-0 items-start", className)} {...props}>
      <div className="border-line-light relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border">
        {src ? (
          <img src={src} alt={alt || "Thumbnail"} className="h-full w-full object-cover" />
        ) : (
          <div className="bg-base-secondary h-full w-full animate-pulse" />
        )}
      </div>
    </div>
  );
};
