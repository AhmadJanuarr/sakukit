import { ControlBar } from "./ControlBar";
import { QueueList } from "./QueueList";

interface ImageQueueProps {
  file: File[];
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  handleImageRemove: (index: number) => void;
  convertImages: () => void;
  addMoreImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearAll: () => void;
}

export const ImageQueue = ({
  file,
  selectedFormat,
  onFormatChange,
  handleImageRemove,
  convertImages,
  addMoreImages,
  handleClearAll,
}: ImageQueueProps) => {
  return (
    <section>
      <QueueList
        file={file}
        selectedFormat={selectedFormat}
        onFormatChange={onFormatChange}
        handleImageRemove={handleImageRemove}
      />
      <ControlBar addMoreImages={addMoreImages} convertImages={convertImages} handleClearAll={handleClearAll} />
    </section>
  );
};
