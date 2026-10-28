import { useObjectUrls } from "@/shared/hooks/useObjectUrls";
import { ControlBar } from "./ControlBar";
import { QueueList } from "./QueueList";

interface ImageQueueProps {
  files: File[];
  isUploading?: boolean;
  pendingFileCount?: number;
  isProcessing: boolean;
  quality: number;
  compressedResults: { name: string; url: string; newSize: number }[];
  onRemoveFile: (index: number) => void;
  onClearFiles: () => void;
  onProcess: () => void;
  onDownloadFile: (url: string, fileName: string) => void;
  onDownloadAll: () => void;
  onQualityChange: (quality: number) => void;
  onAddFiles: (files: File[]) => void;
}

export const ImageQueue = ({
  onRemoveFile,
  onClearFiles,
  onProcess,
  onDownloadFile,
  onDownloadAll,
  onQualityChange,
  onAddFiles,
  files,
  compressedResults,
  quality,
  isUploading,
  isProcessing,
  pendingFileCount,
}: ImageQueueProps) => {
  const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalCompressedSize = compressedResults.reduce((acc, c) => acc + c.newSize, 0);
  const totalSaved = totalOriginalSize - totalCompressedSize;
  const avgSaved = totalCompressedSize > 0 ? Math.round((totalSaved / totalOriginalSize) * 100) : 0;
  const imageUrls = useObjectUrls(files);

  return (
    <section className="border-line-strong w-full min-w-0 overflow-hidden rounded-lg border">
      <QueueList
        files={files}
        compressedResults={compressedResults}
        imageUrls={imageUrls}
        onRemoveFile={onRemoveFile}
        onDownloadFile={onDownloadFile}
        isProcessing={isUploading}
        pendingFileCount={pendingFileCount}
      />
      <ControlBar
        compressedResults={compressedResults}
        isProcessing={isProcessing}
        totalSaved={totalSaved}
        avgSaved={avgSaved}
        quality={quality}
        onQualityChange={onQualityChange}
        onClearFiles={onClearFiles}
        onProcess={onProcess}
        onDownloadAll={onDownloadAll}
        onAddFiles={onAddFiles}
      />
    </section>
  );
};
