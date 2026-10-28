import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/class-names";
import { LuX } from "react-icons/lu";

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
    <div className="border-line-light grid grid-cols-3 gap-x-3 gap-y-3 border-b px-3 py-3 sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-6 sm:py-4">
      <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-5">
        <div className="bg-line-light size-10 shrink-0 overflow-hidden rounded sm:size-11">
          <img src={thumbnailUrl} alt={`${fileName} thumbnail`} className="size-full object-cover" />
        </div>
        <span className="min-w-0 truncate text-sm font-medium">{fileName}</span>
      </div>

      <div className="col-span-1 flex justify-end sm:order-5 sm:col-span-1 sm:justify-center">
        <Button
          className="border"
          variant="outline"
          size="icon"
          onClick={handleRemove}
          aria-label={`Hapus ${fileName}`}
        >
          <LuX className="text-destructive hover:text-destructive/80 size-5 cursor-pointer" />
        </Button>
      </div>

      <div className="col-span-1 text-xs sm:order-2 sm:col-span-2 sm:text-sm">
        <span className="bg-base-secondary border-line-light inline-block rounded border px-2 py-1 uppercase">
          {format}
        </span>
      </div>

      <div className="col-span-1 flex flex-col text-xs sm:order-3 sm:col-span-2 sm:text-sm">
        <span className={cn(compressedSize !== "-" && "text-ink-danger line-through")}>{originalSize}</span>
        {compressedSize !== "-" && <span className="text-ink-primary font-medium">{compressedSize}</span>}
      </div>

      <div className="col-span-1 w-full sm:order-4 sm:col-span-2 sm:pr-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-primary text-sm font-medium">{savedPercentage}%</span>
          <div className="bg-line-light h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-ink-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${savedPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
