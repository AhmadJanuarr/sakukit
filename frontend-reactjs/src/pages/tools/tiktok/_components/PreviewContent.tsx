import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ReactNode } from "react";

interface PreviewContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PreviewContent = ({ className, children, ...props }: PreviewContentProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-10", className)} {...props}>
      {children}
    </div>
  );
};
