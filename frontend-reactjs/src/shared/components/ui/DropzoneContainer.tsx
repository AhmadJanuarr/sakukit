import { DragOverlay } from "@/shared/components/ui/DragOverlay";
import { useDragAndDrop } from "@/shared/hooks/useDragAndDrop";
import { DragEvent, ReactNode } from "react";

interface DropzoneContainerProps {
  children: ReactNode;
  dragHandler: (e: DragEvent<HTMLDivElement>) => void;
}

export const DropzoneContainer = ({ children, dragHandler }: DropzoneContainerProps) => {
  const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } = useDragAndDrop(dragHandler);
  return (
    <div
      className="bg-base-secondary border-line-strong z-10 flex justify-center rounded-xl border border-dashed"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <DragOverlay isDragging={isDragging} />
      {children}
    </div>
  );
};
