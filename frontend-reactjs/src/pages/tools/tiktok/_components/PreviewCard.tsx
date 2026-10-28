import { cn } from "@/shared/utils/class-names";
import { ReactNode, HTMLAttributes } from "react";

interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: ReactNode;
}

export const PreviewCard = ({ className, active, children, ...props }: PreviewCardProps) => {
  return (
    <div
      className={cn(
        "py-10 transition-all duration-500 ease-out",
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
        className,
      )}
      {...props}
    >
      <div className="border-line-strong flex w-full flex-col gap-6 rounded-2xl border p-6 sm:flex-row">{children}</div>
    </div>
  );
};
