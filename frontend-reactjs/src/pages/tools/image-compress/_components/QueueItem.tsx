import { cn } from "@/shared/utils/class-names";
import { LuX } from "react-icons/lu";
import { PiDownloadSimpleFill } from "react-icons/pi";

interface QueueItemProps {
  fileName: string;
  thumbnailUrl: string;
  format: string;
  originalSize: string;
  compressedSize: string;
  savedPercentage: number;
  handleRemove?: () => void;
  handleDownloadSingle?: () => void;
}

export const QueueItem = ({
  fileName,
  thumbnailUrl,
  format,
  originalSize,
  compressedSize,
  savedPercentage,
  handleRemove,
  handleDownloadSingle,
}: QueueItemProps) => {
  return (
    <div className="border-line-light hover:bg-base-secondary/50 flex flex-col gap-3 border-b p-4 transition-colors md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6 md:py-4">
      <div className="col-span-5 flex w-full items-start justify-between gap-3 md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="bg-line-light size-12 shrink-0 overflow-hidden rounded md:size-10">
            <img src={thumbnailUrl} alt={`${fileName} thumbnail`} className="size-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:gap-0">
            <span className="truncate text-sm font-medium">{fileName}</span>
            <div className="text-content-secondary flex flex-wrap items-center gap-2 text-xs md:hidden">
              <span className="bg-base-secondary border-line-light rounded border px-1.5 py-0.5 text-[10px] uppercase">
                {format}
              </span>
              <span className={cn(compressedSize !== "-" && "line-through opacity-70")}>{originalSize}</span>
              {compressedSize !== "-" && <span className="text-action-primary font-medium">{compressedSize}</span>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 md:hidden">
          <PiDownloadSimpleFill
            className={cn(compressedSize === "-" && "pointer-events-none opacity-50", "size-5 cursor-pointer")}
            onClick={handleDownloadSingle}
          />
          <LuX className="text-destructive hover:text-destructive/80 size-5 cursor-pointer" onClick={handleRemove} />
        </div>
      </div>

      <div className="col-span-2 hidden text-sm md:block">
        <span className="bg-base-secondary border-line-light rounded border px-2 py-1 uppercase">{format}</span>
      </div>

      <div className="col-span-2 hidden flex-col md:flex">
        <span className={cn(compressedSize !== "-" && "line-through")}>{originalSize}</span>
        {compressedSize !== "-" && <span className="text-action-primary font-medium">{compressedSize}</span>}
      </div>

      {/* Saved */}
      <div className="col-span-2 w-full md:pr-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-action-primary text-xs font-medium md:text-sm">
            {savedPercentage}%<span className="md:hidden"> saved</span>
          </span>
          <div className="bg-line-light h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-action-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${savedPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="col-span-1 hidden justify-center gap-4 md:flex">
        <LuX className="text-ink-danger size-5 cursor-pointer rounded-md p-0.5 hover:size-6" onClick={handleRemove} />
      </div>
    </div>
  );
};
