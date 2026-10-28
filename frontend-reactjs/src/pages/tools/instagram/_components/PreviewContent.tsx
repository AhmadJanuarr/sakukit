import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ReactNode } from "react";

interface PreviewContentProps {
  className?: string;
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
}

export const PreviewContent = ({ className, children, ...props }: PreviewContentProps) => (
  <div className={cn("mt-1 flex flex-1 flex-col justify-between py-0 md:mt-0 md:py-2", className)} {...props}>
    {children}
  </div>
);
