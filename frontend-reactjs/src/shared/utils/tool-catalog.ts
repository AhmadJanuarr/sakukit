import { TOOLS_CATALOG } from "@/constants/tools-catalog";

export const getToolByPath = (currentPath: string) => {
  return TOOLS_CATALOG.find((tool) => tool.href === currentPath);
};

export const getRecommendedTools = (currentPath: string) => {
  const currentTool = getToolByPath(currentPath);

  if (!currentTool) return [];

  return TOOLS_CATALOG.filter(
    (tool) =>
      tool.category === currentTool.category && tool.href !== currentPath && tool.availability.isActive && tool.href,
  ).slice(0, 3);
};
