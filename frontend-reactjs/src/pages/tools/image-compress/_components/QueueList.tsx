import { FormatBytes } from "@/shared/utils/format-bytes";
import { QueueItem } from "./QueueItem";
import { QueueItemSkeleton } from "./QueueItemSkeleton";

interface QueueListProps {
  files: File[];
  imageUrls: string[];
  compressedResults: { name: string; url: string; newSize: number }[];
  handleRemove: (index: number) => void;
  handleDownloadSingle: (url: string, fileName: string) => void;
  isProcessing?: boolean;
  pendingFileCount?: number;
}

export const QueueList = ({
  files,
  compressedResults,
  imageUrls,
  handleRemove,
  handleDownloadSingle,
  isProcessing,
  pendingFileCount,
}: QueueListProps) => {
  return (
    <div className="border-line-light overflow-hidden rounded-xl border">
      <div className="border-line-light hidden grid-cols-12 gap-4 border-b px-6 py-3 text-xs font-medium tracking-wider uppercase md:grid">
        <div className="col-span-5">File</div>
        <div className="col-span-2">Format</div>
        <div className="col-span-2">Ukuran</div>
        <div className="col-span-2">Saved</div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {files.map((file, index) => {
        const result = compressedResults[index];
        const originalSize = file.size;
        const compressedSize = result ? result.newSize : 0;
        const savedPercentage = result ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

        return (
          <QueueItem
            key={file.name + index}
            fileName={file.name}
            thumbnailUrl={imageUrls[index]}
            format={file.name.split(".").pop()?.toUpperCase() || "UNKNOWN"}
            originalSize={FormatBytes(originalSize)}
            compressedSize={result ? FormatBytes(compressedSize) : "-"}
            savedPercentage={savedPercentage}
            handleRemove={() => handleRemove(index)}
            handleDownloadSingle={() => {
              if (result) handleDownloadSingle(result.url, result.name);
            }}
          />
        );
      })}

      {isProcessing && pendingFileCount && pendingFileCount > 0
        ? Array.from({ length: pendingFileCount }).map((_, index) => <QueueItemSkeleton key={`skeleton-${index}`} />)
        : null}
    </div>
  );
};
