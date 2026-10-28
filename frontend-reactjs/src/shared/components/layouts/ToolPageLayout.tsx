import { ReactNode } from "react";

interface ToolPageLayoutProps {
  title?: string;
  desc?: string;
  children: ReactNode;
}

export const ToolPageLayout = ({ children, title, desc }: ToolPageLayoutProps) => {
  return (
    <div className="h-full w-full p-2">
      <div className="bg-base-secondary flex h-full w-full flex-col rounded-xl px-8 py-10">
        <div className="mb-5">
          <h1 className="text-xl font-bold xl:text-4xl">{title}</h1>
          {desc && <p className="text-md font-medium tracking-tight">{desc}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
