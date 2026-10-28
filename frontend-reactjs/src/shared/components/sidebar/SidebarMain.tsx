import { SIDEBAR_ITEMS } from "./navigation-items";
import { SidebarLink } from "./SidebarLink";

interface SidebarNavProps {
  isCollapsed: boolean;
  onNavigate?: () => void;
}

export const SidebarMain = ({ isCollapsed, onNavigate }: SidebarNavProps) => {
  const mainItems = SIDEBAR_ITEMS.filter((item) => item.section === "main");

  return (
    <nav className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto px-2">
      <ul className="flex flex-col gap-1">
        {mainItems.map((item) => (
          <li key={item.to}>
            <SidebarLink
              to={item.to}
              label={item.label}
              isCollapsed={isCollapsed}
              icon={item.icon}
              isAvailable={item.isAvailable}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
