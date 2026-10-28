import { Button } from "@/shared/components/ui/Button";
import { getRecommendedTools } from "@/shared/utils/tool-catalog";
import { Link } from "react-router-dom";
import { PiCheckCircle, PiArrowUpRight } from "react-icons/pi";
import { useEffect, useState } from "react";

interface DownloadSuccessModalContentProps {
  onContinue: () => void;
  currentPath: string;
}

export const DownloadSuccessModalContent = ({ onContinue, currentPath }: DownloadSuccessModalContentProps) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const recommendedTools = getRecommendedTools(currentPath);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mb-5 flex justify-center">
        <div className="bg-accent-primary flex size-16 items-center justify-center rounded-full ring-2">
          <PiCheckCircle className="size-8" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight">Download Berhasil Dimulai!</h3>
        <p className="mx-auto max-w-xs text-sm leading-relaxed">
          File sedang diunduh oleh browser Anda. Ingin memilih format atau resolusi lainnya?
        </p>
      </div>
      <div className="my-6">
        <Button onClick={onContinue} className="text-md w-full py-5" disabled={timeLeft > 0}>
          {timeLeft > 0 ? `Menunggu... (${timeLeft}s)` : "Download lagi"}
        </Button>
      </div>
      {recommendedTools.length > 0 && (
        <div>
          <div className="mb-6">
            <span className="text-xs tracking-wider">Coba Alat Lainnya</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {recommendedTools.flatMap((tool) => {
              if (!tool.href) return [];
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  to={tool.href}
                  onClick={(e) => {
                    if (timeLeft > 0) {
                      e.preventDefault();
                    } else {
                      onContinue();
                    }
                  }}
                  className={`group border-line-strong hover:bg-base-secondary flex items-center gap-3 rounded-xl border p-2.5 transition-all duration-250 ${
                    timeLeft > 0 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <div className="bg-accent-primary border-line-strong flex size-8 shrink-0 items-center justify-center rounded-lg border">
                    {Icon && <Icon size={16} />}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
                    <span className="truncate text-xs">{tool.title}</span>
                    <PiArrowUpRight className="size-3.5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
