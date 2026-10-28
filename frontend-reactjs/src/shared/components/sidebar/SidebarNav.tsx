import { cn } from "@/shared/utils/class-names";
import { NavGroup } from "./navigation-items";
import { SidebarLink } from "./SidebarLink";

interface SidebarNavProps {
  groups: NavGroup[];
  isCollapsed: boolean;
}

export const SidebarNav = ({ groups, isCollapsed }: SidebarNavProps) => {
  if (groups.length === 0) {
    return <p className="pt-4 text-center">Alat tidak ditemukan</p>;
  }

  return (
    <nav className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto">
      {groups.map((group) => (
        <div className="mb-4" key={group.category}>
          <ul className="space-y-1">
            {group.links.map((link) => (
              <li key={link.to}>
                <SidebarLink
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  isCollapsed={isCollapsed}
                  isAvailable={link.isAvailable ?? true}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};
