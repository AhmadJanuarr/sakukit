import { getToolByPath } from "@/shared/utils/tool-catalog";
import { ReactNode } from "react";
import { LuFileCog } from "react-icons/lu";
import { RxBookmark } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { IconBox } from "../ui/IconBox";

interface ToolPageLayoutProps {
  children: ReactNode;
}

export const ToolPageLayout = ({ children }: ToolPageLayoutProps) => {
  const { pathname } = useLocation();
  const tool = getToolByPath(pathname);

  if (!tool) {
    return (
      <div className="flex min-h-75 w-full items-center justify-center rounded-xl border border-dashed p-8 text-center text-stone-500">
        Tool tidak ditemukan!
      </div>
    );
  }

  const ToolIcon = tool.icon ?? LuFileCog;

  return (
    <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
      <div className="flex min-h-full min-w-0 flex-col">
        <header className="flex items-start justify-between gap-3 pb-4 sm:items-center sm:gap-6 sm:pb-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <IconBox icon={ToolIcon} palette={tool.palette} />
            <div className="min-w-0 space-y-0.5">
              <h1 className="text-ink-primary text-xl font-bold tracking-tight sm:text-2xl">{tool.title}</h1>
              {tool.description && <p className="text-ink-secondary text-xs sm:text-sm">{tool.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-base-secondary rounded-lg p-5"
              aria-label="Bookmark Tool"
            >
              <RxBookmark className="size-6" />
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col justify-between">{children}</main>
      </div>
    </div>
  );
};
