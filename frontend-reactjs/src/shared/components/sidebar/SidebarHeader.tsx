import { Link } from "react-router-dom";
import { LuPanelRightClose, LuPanelRightOpen } from "react-icons/lu";
import { cn } from "@/shared/utils/class-names";

interface SidebarHeaderProps {
  name: string;
  icon: string;
  isCollapsed: boolean;
  onToggle: () => void;
}
export const SidebarHeader = ({ name, icon, isCollapsed, onToggle }: SidebarHeaderProps) => {
  return (
    <div className="relative flex h-14 items-center py-6">
      <Link
        to="/"
        className={cn(
          "absolute flex items-center gap-3 rounded-lg p-1.5 transition-all duration-300 hover:opacity-80",
          isCollapsed ? "pointer-events-none hidden" : "",
        )}
      >
        <img src={icon} alt="logo-madlabs" className="size-8 shrink-0 object-contain" />
        <span className="text-ink-primary text-xl font-bold tracking-tight whitespace-nowrap">{name}</span>
      </Link>
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={onToggle}
        className={cn(
          "hover:text-ink-primary hover:bg-base-secondary flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-all duration-300 active:scale-95",
          isCollapsed ? "mx-auto" : "ml-auto",
        )}
      >
        <LuPanelRightOpen
          className={cn("size-5 transition-transform duration-300", isCollapsed ? "rotate-180" : "rotate-0")}
        />
      </button>
    </div>
  );
};
