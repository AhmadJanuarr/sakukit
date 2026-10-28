import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

export const PreviewContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mt-1 flex flex-1 flex-col md:mt-0", className)} {...props}>
      {children}
    </div>
  );
};
