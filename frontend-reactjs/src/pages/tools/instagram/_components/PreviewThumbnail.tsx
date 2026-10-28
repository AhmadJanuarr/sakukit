import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface PreviewThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  props?: HTMLAttributes<HTMLDivElement>;
}

export const PreviewThumbnail = ({ className, src, props, alt }: PreviewThumbnailProps) => {
  const proxySrc = src ? `${import.meta.env.VITE_API_URL}proxy/image?url=${encodeURIComponent(src)}` : undefined;
  return (
    <div className={cn("flex w-full shrink-0 items-start md:w-[280px]", className)} {...props}>
      <div className="border-line-light relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5">
        {proxySrc ? (
          <img src={proxySrc} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="bg-base-secondary h-full w-full animate-pulse" />
        )}
      </div>
    </div>
  );
};
