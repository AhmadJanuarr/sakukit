import { DragOverlay } from "@/shared/components/ui/DragOverlay";
import { useDragAndDrop } from "@/shared/hooks/useDragAndDrop";
import { DragEvent, ReactNode } from "react";
const CONTAINER_CLASSES =
  "relative hover:bg-action-primary/10 bg-card-primary z-10 mx-auto w-full rounded-xl p-6 transition-all duration-200";
const INNER_CONTAINER_CLASSES =
  "border-action-primary relative h-full w-full rounded-md border-2 border-dashed transition-all duration-200 justify-center flex";

interface DropzoneContainerProps {
  children: ReactNode;
  dragHandler: (e: DragEvent<HTMLDivElement>) => void;
}

export const DropzoneContainer = ({ children, dragHandler }: DropzoneContainerProps) => {
  const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } = useDragAndDrop(dragHandler);
  return (
    <div
      className={CONTAINER_CLASSES}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={INNER_CONTAINER_CLASSES}>
        <DragOverlay isDragging={isDragging} />
        {children}
      </div>
    </div>
  );
};
