import { cn } from "@/shared/utils/class-names";
import { FormatDuration } from "@/shared/utils/format-duration";
import { HTMLAttributes } from "react";

interface PreviewInfoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
  duration?: string;
}

export const MediaPreviewInfo = ({ className, title, author, duration, ...props }: PreviewInfoProps) => {
  return (
    <div className={cn("min-w-0 space-y-2", className)} {...props}>
      <h3 className="line-clamp-2 text-lg font-semibold sm:text-xl">{title || "Post not found"}</h3>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full">@{author || "Pengguna Anonim"}</span>
        {duration && (
          <>
            <span className="bg-base-primary border-line-strong size-2 rounded-full border" />
            <span className="tracking-wide">{FormatDuration(duration)}</span>
          </>
        )}
      </div>
    </div>
  );
};
