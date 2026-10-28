"use client";
import { useEffect, useMemo } from "react";
import { ControlBar } from "./ControlBar";
import { QueueList } from "./QueueList";

interface ImageQueueProps {
  files: File[];
  isProcessing?: boolean;
  pendingFileCount?: number;
  isCompression: boolean;
  quality: number;
  compressedResults: { name: string; url: string; newSize: number }[];
  handleRemove: (index: number) => void;
  handleClearAll: () => void;
  startCompression: () => void;
  handleDownloadSingle: (url: string, fileName: string) => void;
  handleDownloadAll: () => void;
  setQuality: (quality: number) => void;
  handleAddMoreImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageQueue = ({
  handleRemove,
  handleClearAll,
  startCompression,
  handleDownloadSingle,
  handleDownloadAll,
  setQuality,
  handleAddMoreImages,
  files,
  compressedResults,
  isCompression,
  quality,
  isProcessing,
  pendingFileCount,
}: ImageQueueProps) => {
  const imageUrls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  useEffect(() => {
    return () => imageUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [imageUrls]);

  const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalCompressedSize = compressedResults.reduce((acc, c) => acc + c.newSize, 0);
  const totalSaved = totalOriginalSize - totalCompressedSize;
  const avgSaved = totalCompressedSize > 0 ? Math.round((totalSaved / totalOriginalSize) * 100) : 0;

  return (
    <section>
      <QueueList
        files={files}
        compressedResults={compressedResults}
        imageUrls={imageUrls}
        handleRemove={handleRemove}
        handleDownloadSingle={handleDownloadSingle}
        isProcessing={isProcessing}
        pendingFileCount={pendingFileCount}
      />
      <ControlBar
        files={files}
        compressedResults={compressedResults}
        isCompression={isCompression}
        totalSaved={totalSaved}
        avgSaved={avgSaved}
        quality={quality}
        setQuality={setQuality}
        handleClearAll={handleClearAll}
        startCompression={startCompression}
        handleDownloadAll={handleDownloadAll}
        handleAddMoreImages={handleAddMoreImages}
      />
    </section>
  );
};
