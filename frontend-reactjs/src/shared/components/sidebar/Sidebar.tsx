import { SITE_CONFIG } from "@/constants/site-config";
import { useState } from "react";
import { Divider } from "../ui/Divider";
import { NAVIGATION_ITEMS } from "./navigation-items";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarSearch } from "./SidebarSearch";
import { cn } from "@/shared/utils/class-names";

export const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { name, icon } = SITE_CONFIG;

  const filteredNavigation = NAVIGATION_ITEMS.map((group) => ({
    category: group.category,
    links: group.links.filter((link) => link.label.toLowerCase().includes(searchQuery.toLowerCase())),
  })).filter((group) => group.links.length > 0);

  return (
    <aside className={cn("flex h-full flex-col space-y-5 px-4", isCollapsed ? "w-20" : "w-72")}>
      <SidebarHeader
        name={name}
        icon={icon}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
      />
      <SidebarSearch value={searchQuery} onChange={setSearchQuery} isCollapsed={isCollapsed} />
      <SidebarNav groups={filteredNavigation} isCollapsed={isCollapsed} />
    </aside>
  );
};
