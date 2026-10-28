import { LuChevronDown, LuX } from "react-icons/lu";
import { FormatBytes } from "@/shared/utils/format-bytes";
import { Button } from "@/shared/components/ui/Button";
import { useObjectUrls } from "@/shared/hooks/useObjectUrls";

interface QueueListProps {
  file: File[];
  selectedFormats: string[];
  onFormatChange: (index: number, format: string) => void;
  handleImageRemove: (index: number) => void;
}

export const QueueList = ({ file, selectedFormats, onFormatChange, handleImageRemove }: QueueListProps) => {
  const imageUrls = useObjectUrls(file);
  return (
    <div>
      <div className="bg-base-secondary hidden grid-cols-12 gap-4 border-b px-6 py-3 text-xs font-medium tracking-wider uppercase md:grid">
        <div className="col-span-5">File</div>
        <div className="col-span-3">Ukuran</div>
        <div className="col-span-3">Konversi Ke</div>
        <div className="col-span-1 text-right">Action</div>
      </div>
      <div className="max-h-75 overflow-y-auto">
        {file.map((image, index) => (
          <div
            key={index}
            className="border-line-light hover:bg-base-secondary/50 flex flex-col gap-3 border-b p-4 transition-colors md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6 md:py-4"
          >
            <div className="col-span-5 flex w-full items-start justify-between gap-3 md:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="bg-line-light size-12 shrink-0 overflow-hidden rounded md:size-10">
                  <img
                    src={imageUrls[index] ?? ""}
                    alt={`Pratinjau ${image.name}`}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1 md:gap-0">
                  <span className="truncate text-sm font-medium">{image.name}</span>
                  <div className="text-content-secondary flex items-center gap-2 text-xs md:hidden">
                    <span>{FormatBytes(image.size)}</span>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                aria-label={`Hapus ${image.name}`}
                className="flex shrink-0 items-center gap-3 md:hidden"
                onClick={() => handleImageRemove(index)}
              >
                <LuX aria-hidden="true" />
              </Button>
            </div>

            <div className="col-span-3 hidden flex-col md:flex">
              <span className="text-sm">{FormatBytes(image.size)}</span>
            </div>

            <div className="col-span-3 w-full md:pr-4">
              <div className="border-line-light flex w-full items-center justify-between gap-4 border-t pt-2 sm:w-auto sm:justify-start sm:border-none sm:pt-0">
                <span className="shrink-0 text-xs md:hidden">Konversi ke:</span>
                <div className="relative flex w-full items-center gap-2 sm:w-auto">
                  <select
                    className="border-line-strong bg-base-primary block w-full cursor-pointer appearance-none rounded-lg border px-3 py-1.5 pr-8 text-xs uppercase"
                    value={selectedFormats[index] ?? "webp"}
                    onChange={(e) => onFormatChange(index, e.target.value)}
                  >
                    {["webp", "png", "jpg", "jpeg"].map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="col-span-1 hidden justify-end gap-4 md:flex">
              <Button className="border" variant="outline" size="icon" onClick={() => handleImageRemove(index)}>
                <LuX className="text-destructive hover:text-destructive/80 size-5 cursor-pointer" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
