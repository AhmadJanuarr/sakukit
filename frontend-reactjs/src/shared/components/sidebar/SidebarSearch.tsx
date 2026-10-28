import { cn } from "@/shared/utils/class-names";
import { LuCommand, LuSearch } from "react-icons/lu";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
  isCollapsed: boolean;
}

export const SidebarSearch = ({ value, onChange, isCollapsed }: SidebarSearchProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-20 opacity-100",
      )}
    >
      <div className="text-ink-secondary bn relative">
        <LuSearch className="absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-card-search w-full rounded-xl py-1 pr-4 pl-9 font-medium outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="text-ink-secondary bg-base-primary absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-lg px-1 py-0.5 text-sm font-medium">
          <LuCommand />K
        </div>
      </div>
    </div>
  );
};
