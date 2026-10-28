import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ReactNode } from "react";

interface PreviewContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MediaPreviewContent = ({ className, children, ...props }: PreviewContentProps) => (
  <div className={cn("mt-1 flex min-w-0 flex-1 flex-col space-y-4 sm:space-y-6", className)} {...props}>
    {children}
  </div>
);
