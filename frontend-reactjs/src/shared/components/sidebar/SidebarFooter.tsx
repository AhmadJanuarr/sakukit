import { LuShieldCheck } from "react-icons/lu";
import { SIDEBAR_ITEMS } from "./navigation-items";
import { SidebarLink } from "./SidebarLink";

interface SidebarFooterProps {
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

export const SidebarFooter = ({ isCollapsed, onNavigate }: SidebarFooterProps) => {
  const footerItems = SIDEBAR_ITEMS.filter((item) => item.section === "footer");

  return (
    <div className="mt-auto">
      {!isCollapsed && (
        <div className="p-3">
          <div className="border-line-strong rounded-lg border bg-white p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-950">
              <LuShieldCheck className="size-4 shrink-0 text-blue-600" />
              <span>Privasi terjaga</span>
            </div>
            <p className="text-content-secondary mt-1 text-xs leading-5">
              Gambar diproses langsung di browser dan tidak diunggah ke server.
            </p>
          </div>
        </div>
      )}

      <div className="border-line-strong border-t p-3">
        <ul className="flex flex-col gap-1">
          {footerItems.map((item) => (
            <li key={item.to}>
              <SidebarLink
                to={item.to}
                label={item.label}
                isCollapsed={Boolean(isCollapsed)}
                icon={item.icon}
                isAvailable={item.isAvailable}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <p className="text-content-secondary mt-8 px-1 text-xs">
            v1.0 <span aria-hidden="true">·</span> Tema: Terang
          </p>
        )}
      </div>
    </div>
  );
};
