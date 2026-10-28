import { Button } from "@/shared/components/ui/Button";
import { LuPlus } from "react-icons/lu";
import { PiCaretDownBold, PiDownloadSimpleFill, PiSpinnerGapLight } from "react-icons/pi";

interface ControlBarProps {
  files: File[];
  compressedResults: { name: string; url: string; newSize: number }[];
  totalSaved: number;
  avgSaved: number;
  isCompression: boolean;
  quality: number;
  handleClearAll: () => void;
  startCompression: () => void;
  setQuality: (quality: number) => void;
  handleDownloadAll: () => void;
  handleAddMoreImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ControlBar = ({
  compressedResults,
  isCompression,
  quality,
  setQuality,
  handleClearAll,
  startCompression,
  handleDownloadAll,
  handleAddMoreImages,
}: ControlBarProps) => {
  return (
    <div className="border-line-light bg-base-secondary text-ink-primary mt-6 flex flex-col gap-4 rounded-lg border p-2 sm:flex-row sm:items-center sm:justify-between">
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
          onChange={handleAddMoreImages}
        />
        <button
          onClick={handleClearAll}
          className="text-ink-danger hover:text-ink-danger-hover cursor-pointer text-sm font-medium transition-all duration-300"
        >
          Hapus Semua*
        </button>
      </div>
      <div className="relative flex w-full flex-wrap items-center justify-between gap-3 px-2 sm:w-auto sm:px-0">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="compression-level">Level Kompresi:</label>
          <div className="group relative">
            <select
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              id="compression-level"
              className="border-line-light bg-base-secondary cursor-pointer appearance-none rounded-lg border px-3 py-1.5 pr-8 transition-all duration-200 outline-none"
            >
              <option value={40}>Rendah</option>
              <option value={70}>Sedang</option>
              <option value={90}>Tinggi</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-colors">
              <PiCaretDownBold className="size-3" />
            </div>
          </div>
        </div>
        {compressedResults.length > 0 ? (
          <Button onClick={handleDownloadAll}>
            <span className="hidden sm:inline">Download Semua</span>
          </Button>
        ) : isCompression ? (
          <Button disabled>
            <span className="hidden sm:inline">Kompressing...</span>
          </Button>
        ) : (
          <Button onClick={startCompression}>
            <span className="hidden sm:inline">Mulai Kompress</span>
          </Button>
        )}
      </div>
    </div>
  );
};
