import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar";

export const RootLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
