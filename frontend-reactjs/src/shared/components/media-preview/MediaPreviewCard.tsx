import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ReactNode } from "react";

interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: ReactNode;
}

export const MediaPreviewCard = ({ className, active, children, ...props }: PreviewCardProps) => {
  return (
    <div
      className={cn(
        "py-6 transition-all duration-500 ease-out sm:py-10",
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
        className,
      )}
      {...props}
    >
      <div className="border-line-strong flex flex-col gap-4 rounded-lg border p-3 sm:flex-row sm:gap-5 sm:p-4">
        {children}
      </div>
    </div>
  );
};
