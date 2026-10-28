import { ControlBar } from "./ControlBar";
import { QueueList } from "./QueueList";

interface ImageQueueProps {
  files: File[];
  isProcessing: boolean;
  selectedFormats: string[];
  onFormatChange: (index: number, format: string) => void;
  onRemoveFile: (index: number) => void;
  onProcess: () => void;
  onAddFiles: (files: File[]) => void;
  onClearFiles: () => void;
}

export const ImageQueue = ({
  files,
  isProcessing,
  selectedFormats,
  onFormatChange,
  onRemoveFile,
  onProcess,
  onAddFiles,
  onClearFiles,
}: ImageQueueProps) => {
  return (
    <section className="border-line-strong overflow-hidden rounded-lg border">
      <QueueList
        file={files}
        selectedFormats={selectedFormats}
        onFormatChange={onFormatChange}
        handleImageRemove={onRemoveFile}
      />
      <ControlBar
        isProcessing={isProcessing}
        onAddFiles={onAddFiles}
        onProcess={onProcess}
        onClearFiles={onClearFiles}
      />
    </section>
  );
};
