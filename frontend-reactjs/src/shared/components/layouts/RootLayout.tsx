import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar";
import { RouteBreadcrumb } from "../ui/RouteBreadcrumb";

export const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="bg-base-primary/95 supports-backdrop-filter:bg-base-primary/80 sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-3 border-b px-4 py-4 backdrop-blur">
          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="text-ink-primary -ml-2 inline-flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-black/5 md:hidden"
          >
            <LuMenu className="size-5" />
          </button>
          <RouteBreadcrumb />
        </header>
        <Outlet />
      </main>
    </div>
  );
};
