import { cn } from "@/shared/utils/class-names";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "../ui/Tooltip";

interface SidebarLinkProps {
  to: string;
  icon: IconType;
  label: string;
  isCollapsed: boolean;
  isAvailable?: boolean;
  onNavigate?: () => void;
}

export const SidebarLink = ({ to, icon: Icon, label, isCollapsed, isAvailable, onNavigate }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isDisabled = !isAvailable;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      onNavigate?.();
    }
  };

  return (
    <Tooltip content={label} show={isCollapsed}>
      <Link
        to={isDisabled ? "#" : to}
        onClick={handleClick}
        aria-disabled={isDisabled}
        className={cn(
          "text-ink-secondary flex h-10 w-full items-center overflow-hidden rounded-lg border px-3 text-sm",
          isDisabled && "cursor-not-allowed opacity-50",
          isActive && !isDisabled
            ? "bg-base-primary border-black/5 dark:border-white/10"
            : "hover:bg-base-secondary/50 hover:text-ink-primary border-transparent",
        )}
      >
        <div className="flex size-5 shrink-0 items-center justify-center">
          {Icon && <Icon className="size-4 shrink-0" />}
        </div>
        <div
          className={cn(
            "ml-2.5 grid overflow-hidden transition-all duration-800 ease-in-out",
            isCollapsed && "max-w-40 opacity-100",
          )}
        >
          <span
            className={cn("text-ink-secondary truncate whitespace-nowrap", isActive && "text-ink-primary font-medium")}
          >
            {label}
          </span>
        </div>
      </Link>
    </Tooltip>
  );
};
