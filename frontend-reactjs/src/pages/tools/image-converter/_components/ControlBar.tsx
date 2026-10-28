import { Button } from "@/shared/components/ui/Button";
import { LuDownload, LuPlus } from "react-icons/lu";

export const ControlBar = ({
  addMoreImages,
  convertImages,
  handleClearAll,
}: {
  convertImages: () => void;
  handleClearAll: () => void;
  addMoreImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="border-line-light bg-base-secondary mt-6 flex items-center justify-between rounded-lg border p-2">
      <div className="flex items-center gap-4 px-2 sm:px-0">
        <label
          htmlFor="file-upload"
          className="hover:text-ink-hover flex cursor-pointer items-center justify-center gap-2 text-sm font-medium transition-all duration-200"
        >
          <LuPlus className="size-4" />
          <span className="hidden sm:inline">Tambahkan lebih banyak gambar</span>
          <span className="sm:hidden">Tambah gambar</span>
        </label>
        <input className="hidden" type="file" multiple accept="image/*" id="file-upload" onChange={addMoreImages} />
        <button
          onClick={handleClearAll}
          className="text-ink-danger hover:text-ink-danger-hover cursor-pointer text-sm font-medium transition-all duration-300"
        >
          Hapus Semua*
        </button>
      </div>
      <div className="relative flex items-center gap-5">
        <Button onClick={convertImages}>
          <LuDownload className="size-4" />
          Konversi
        </Button>
      </div>
    </div>
  );
};
