import { Button } from "@/shared/components/ui/Button";
import { LuArrowLeftRight, LuPlus } from "react-icons/lu";

export const ControlBar = ({
  isProcessing,
  onAddFiles,
  onProcess,
  onClearFiles,
}: {
  isProcessing: boolean;
  onProcess: () => void;
  onClearFiles: () => void;
  onAddFiles: (files: File[]) => void;
}) => {
  return (
    <div className="p-2">
      <div className="border-line-strong bg-base-primary text-ink-primary flex flex-col gap-4 rounded-lg border p-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 px-2 sm:px-0">
          <label
            htmlFor="file-upload"
            className="hover:text-ink-hover flex cursor-pointer items-center justify-center gap-2 text-sm font-medium transition-all duration-200"
          >
            <LuPlus className="size-4" />
            <span className="hidden sm:inline">Tambahkan lebih banyak gambar</span>
            <span className="sm:hidden">Tambah gambar</span>
          </label>
          <input
            className="hidden"
            type="file"
            multiple
            accept="image/*"
            id="file-upload"
            onChange={(event) => {
              const selectedFiles = Array.from(event.currentTarget.files ?? []);
              event.currentTarget.value = "";
              if (selectedFiles.length > 0) onAddFiles(selectedFiles);
            }}
          />
          <Button
            variant="ghost"
            onClick={onClearFiles}
            className="text-ink-danger hover:text-ink-danger-hover cursor-pointer text-sm font-medium"
          >
            Hapus Semua*
          </Button>
        </div>
        <div className="relative flex items-center gap-5">
          <Button onClick={onProcess} disabled={isProcessing} className="h-11">
            <LuArrowLeftRight /> {isProcessing ? "Mengonversi..." : "Konversi"}
          </Button>
        </div>
      </div>
    </div>
  );
};
