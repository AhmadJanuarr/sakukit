import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface PreviewInfoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
  duration?: string;
}

export const PreviewInfo = ({ className, title, author, duration, ...props }: PreviewInfoProps) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <h3 className="text-2xl">{title || "Video TikTok"}</h3>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-action-primary bg-action-primary/10 rounded-full px-3 py-1">
          @{author || "Pengguna TikTok"}
        </span>
        {duration && (
          <>
            <span className="bg-line-strong h-1 w-1 rounded-full" />
            <span className="text-action-primary font-medium tracking-wide">{duration}</span>
          </>
        )}
      </div>
    </div>
  );
};
