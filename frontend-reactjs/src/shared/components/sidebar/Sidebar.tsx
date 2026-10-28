import { SITE_CONFIG } from "@/constants/site-config";
import { cn } from "@/shared/utils/class-names";
import { useEffect, useState } from "react";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMain } from "./SidebarMain";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { name, icon } = SITE_CONFIG;

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Tutup menu"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "border-line-strong bg-base-secondary fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col space-y-5 border-r shadow-xl transition-all duration-300 ease-in-out md:static md:z-auto md:w-auto md:translate-x-0 md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "md:w-16" : "md:w-60",
        )}
      >
        <SidebarHeader
          name={name}
          icon={icon}
          isCollapsed={isCollapsed}
          onToggle={() => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              onClose();
              return;
            }

            setIsCollapsed((prev) => !prev);
          }}
        />
        <SidebarMain isCollapsed={isCollapsed} onNavigate={onClose} />
        <SidebarFooter isCollapsed={isCollapsed} onNavigate={onClose} />
      </aside>
    </>
  );
};
