import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes, ReactNode } from "react";

interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: ReactNode;
}

export const PreviewCard = ({ className, active, children, ...props }: PreviewCardProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden py-10 transition-all duration-500 ease-out",
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
        className
      )}
      {...props}
    >
      <div className="bg-base-secondary border-line-strong flex flex-col gap-5 rounded-2xl border p-4 shadow-sm sm:p-5 md:flex-row md:gap-6 md:p-6 md:shadow-none">
        {children}
      </div>
    </div>
  );
};
