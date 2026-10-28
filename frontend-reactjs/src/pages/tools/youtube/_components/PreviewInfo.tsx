import { cn } from "@/shared/utils/class-names";
import { formatDuration } from "../_utils/formatDuration";
import { HTMLAttributes } from "react";

interface PreviewInfoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
  duration?: number | string;
}

export const PreviewInfo = ({ className, title, author, duration, ...props }: PreviewInfoProps) => {
  return (
    <div className={cn("mb-5 space-y-2 md:mb-6 md:space-y-1", className)} {...props}>
      <div className="line-clamp-2 text-lg leading-snug font-semibold text-balance md:line-clamp-none md:text-xl md:leading-normal">
        {title || "Judul Video"}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
        <span className="text-action-primary font-medium md:font-semibold">By {author || "Pembuat Video"}</span>
        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
};
