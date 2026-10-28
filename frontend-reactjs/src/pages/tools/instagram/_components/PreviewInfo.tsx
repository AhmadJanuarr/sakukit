import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface PreviewInfoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
}

export const PreviewInfo = ({ className, title, author, ...props }: PreviewInfoProps) => {
  return (
    <div className={cn("mb-5 space-y-2 md:mb-6 md:space-y-3", className)} {...props}>
      <h3 className="text-xl">{title || "Post Instagram"}</h3>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-action-primary bg-action-primary/10 rounded-full px-2.5 py-0.5 text-xs font-medium md:px-3 md:py-1">
          @{author || "Pengguna Instagram"}
        </span>
      </div>
    </div>
  );
};
