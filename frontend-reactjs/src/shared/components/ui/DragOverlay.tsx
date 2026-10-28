import { PiDownloadSimpleFill } from "react-icons/pi";

const CONTAINER_CLASSES =
  "bg-base-primary pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center rounded-xl transition-all duration-300";

export const DragOverlay = ({ isDragging }: { isDragging: boolean }) => {
  return (
    <div className={`${CONTAINER_CLASSES} ${isDragging ? "opacity-100" : "opacity-0"}`}>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="bg-base-secondary border-line-strong flex h-20 w-20 items-center justify-center rounded-full border">
          <PiDownloadSimpleFill className="text-action-primary size-10" />
        </div>
        <div className="space-y-2">
          <p className="mb-2 text-xl font-semibold">Masukkan gambar Anda di sini.</p>
          <p>Lempar untuk mengupload file Anda</p>
        </div>
      </div>
    </div>
  );
};
