import { getRecommendedTools } from "@/shared/utils/tool-catalog";
import { PiArrowUpRight } from "react-icons/pi";
import { Link } from "react-router-dom";

interface RecommendedToolsProps {
  currentPath: string;
  isVisible?: boolean;
}

const CardRecommendedTools = ({ tool, index }: { tool: any; index: number }) => {
  if (!tool.href) return null;
  const Icon = tool.icon;
  return (
    <Link
      key={tool.href}
      to={tool.href}
      className="group border-line-strong hover:border-ink-primary hover:bg-base-secondary focus-visible:ring-ink-primary bg-base-primary relative flex min-w-0 flex-col justify-between space-y-4 rounded-xl border p-4 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="bg-base-secondary group-hover:bg-base-primary group-hover:border-line-strong flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 sm:size-11">
          {Icon && <Icon aria-hidden="true" size={25} />}
        </div>
        <span className="text-ink-secondary text-xs font-medium tabular-nums">0{index + 1}</span>
      </div>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink-primary truncate font-semibold tracking-tight">{tool.title}</span>
          <PiArrowUpRight
            className="text-ink-secondary group-hover:text-ink-primary size-5 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <p className="text-ink-secondary line-clamp-2 text-sm">{tool.description}</p>
      </div>
    </Link>
  );
};

export const RecommendedTools = ({ currentPath, isVisible = true }: RecommendedToolsProps) => {
  if (!isVisible) return null;
  const recomendedTools = getRecommendedTools(currentPath);

  return (
    <section
      className="border-line-strong bg-base-secondary rounded-lg border px-4 py-6 sm:px-6 sm:py-8"
      aria-labelledby="recommended-tools-title"
    >
      <div className="mb-5 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-ink-secondary mb-2 text-xs uppercase sm:text-sm">Jelajahi lebih lanjut</p>
          <h2 id="recommended-tools-title" className="text-lg tracking-tight sm:text-xl">
            Alat yang mungkin Anda butuhkan
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recomendedTools.map((tool, index) => {
          return <CardRecommendedTools key={tool.href} tool={tool} index={index} />;
        })}
      </div>
    </section>
  );
};
