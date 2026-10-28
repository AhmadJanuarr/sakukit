import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface PreviewThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export const PreviewThumbnail = ({ className, src, alt, ...props }: PreviewThumbnailProps) => {
  return (
    <div className={cn("flex w-full shrink-0 items-start md:w-auto", className)} {...props}>
      <div className="border-line-light flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 md:max-w-xl">
        {src ? (
          <img
            src={src}
            alt={alt}
            width={100}
            height={100}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="bg-base-secondary h-full w-full animate-pulse" />
        )}
      </div>
    </div>
  );
};
