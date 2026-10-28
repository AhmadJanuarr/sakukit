import { cn } from "@/shared/utils/class-names";
import { PiSidebar } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

interface SidebarHeaderProps {
  name: string;
  icon: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarHeader = ({ name, icon, isCollapsed, onToggle }: SidebarHeaderProps) => {
  return (
    <div
      className={cn(
        "flex h-14 items-center transition-all duration-300 ease-in-out",
        isCollapsed ? "justify-center px-0" : "justify-between pl-4",
      )}
    >
      <div
        className={cn(
          "flex items-center overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-50 flex-1 opacity-100",
        )}
      >
        <Link to="/" className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80">
          <img src={icon} alt="logo-sakukit" className="size-8 shrink-0 rounded-md object-contain" />
          <div className="grid">
            <span className="text-ink-primary truncate font-bold tracking-tight whitespace-nowrap">{name}</span>
          </div>
        </Link>
      </div>
      <div>
        <Button variant="ghost" type="button" onClick={onToggle} className="shrink-0 py-5">
          <PiSidebar
            className={cn(
              "text-ink-secondary size-5 transition-transform duration-400 ease-in-out",
              isCollapsed ? "rotate-180" : "rotate-0",
            )}
          />
        </Button>
      </div>
    </div>
  );
};
