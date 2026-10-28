import { cn } from "@/shared/utils/class-names";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "../ui/Tooltip";

interface SidebarLinkProps {
  to: string;
  icon: IconType;
  label: string;
  isCollapsed: boolean;
  isAvailable: boolean;
}

export const SidebarLink = ({ to, icon: Icon, label, isCollapsed, isAvailable }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isDisabled = !isAvailable;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <Tooltip content={label} show={isCollapsed}>
      <Link
        to={isDisabled ? "#" : to}
        onClick={handleClick}
        aria-disabled={isDisabled}
        className={cn(
          "text-ink-primary flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
          isDisabled && "cursor-not-allowed opacity-50",
          isCollapsed && "justify-center px-0",
          isActive && !isDisabled ? "bg-base-secondary" : "border-transparent",
        )}
      >
        <Icon className="size-5 justify-center" />
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap",
            isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100",
          )}
        >
          {label}
        </span>
      </Link>
    </Tooltip>
  );
};
