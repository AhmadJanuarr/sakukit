import { Button } from "@/shared/components/ui/Button";
import { FaCompress } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";

interface ControlBarProps {
  compressedResults: { name: string; url: string; newSize: number }[];
  totalSaved: number;
  avgSaved: number;
  isProcessing: boolean;
  quality: number;
  onClearFiles: () => void;
  onProcess: () => void;
  onQualityChange: (quality: number) => void;
  onDownloadAll: () => void;
  onAddFiles: (files: File[]) => void;
}

export const ControlBar = ({
  compressedResults,
  isProcessing,
  quality,
  onQualityChange,
  onClearFiles,
  onProcess,
  onDownloadAll,
  onAddFiles,
}: ControlBarProps) => {
  const renderMainButton = () => {
    if (compressedResults.length > 0) {
      return (
        <Button onClick={onDownloadAll} className="h-11">
          <span>Download Semua</span>
        </Button>
      );
    }
    return (
      <Button onClick={onProcess} disabled={isProcessing} className="h-11">
        <FaCompress /> {isProcessing ? "Mengompres..." : "Mulai Kompres"}
      </Button>
    );
  };

  return (
    <div className="p-2 sm:p-2">
      <div className="border-line-strong bg-base-primary text-ink-primary flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-1 sm:justify-start sm:gap-4 sm:px-0">
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
            className="text-ink-danger hover:text-ink-danger-hover cursor-pointer text-sm font-medium transition-all duration-300"
            onClick={onClearFiles}
          >
            Hapus Semua*
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <label htmlFor="quality-select" className="text-ink-secondary text-sm">
              Level :
            </label>
            <div className="group relative">
              <select
                id="quality-select"
                value={quality}
                onChange={(e) => onQualityChange(Number(e.target.value))}
                className="border-line-strong bg-base-secondary focus:ring-action-primary/20 h-11 w-full cursor-pointer appearance-none rounded-lg border pr-8 pl-3 text-sm transition-all outline-none focus:ring-2 sm:w-32"
              >
                <option value={40}>Rendah</option>
                <option value={70}>Sedang</option>
                <option value={90}>Tinggi</option>
              </select>
              <PiCaretDownBold className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 opacity-50" />
            </div>
          </div>
          {renderMainButton()}
        </div>
      </div>
    </div>
  );
};
