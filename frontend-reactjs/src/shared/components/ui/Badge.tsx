import { cn } from "@/shared/utils/class-names";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}
export const Badge = ({ children }: BadgeProps) => {
  const Variants = {
    Tersedia: "bg-action-primary text-base-primary",
    "Segera Hadir": "bg-slate-500 text-white",
    Beta: "bg-indigo-500 text-white",
    Perbaikan: "bg-orange-500 text-white",
  };

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "flex items-center justify-center rounded-full px-3 py-1 text-xs font-light tracking-widest",
          Variants[children as keyof typeof Variants],
        )}
      >
        {children}
      </div>
    </div>
  );
};
