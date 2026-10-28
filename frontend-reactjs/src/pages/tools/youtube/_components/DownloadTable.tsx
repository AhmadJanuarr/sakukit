// file: DownloadTable.tsx
import { FormatOption } from "@/shared/types";
import { Button } from "@/shared/components/ui/Button";
import { DownloadOptions } from "../../../../shared/hooks/useMediaDownloader";

interface DownloadTableProps {
  selectedDownloadOption: DownloadOptions;
  setSelectedDownloadOption: (val: DownloadOptions) => void;
  filteredFormats: FormatOption[];
  downloadingFormatId: string | null;
  downloadProgress: number;
  isSubmitting: boolean;
  isDownloading: boolean;
  onDownloadClick: (formatId: string) => void;
}

export const DownloadTable = ({
  selectedDownloadOption,
  setSelectedDownloadOption,
  filteredFormats,
  downloadingFormatId,
  downloadProgress,
  isSubmitting,
  isDownloading,
  onDownloadClick,
}: DownloadTableProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="md:border-line-strong rounded-xl border-none md:overflow-x-auto md:border">
        <table className="block w-full text-left text-sm md:table">
          <thead className="bg-base-primary hidden md:table-header-group">
            <tr className="border-line-strong border-b">
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Format</th>
              <th className="px-4 py-3 font-medium">Quality</th>
              <th className="px-4 py-3 font-medium">File Size</th>
              <th className="px-4 py-3 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="block space-y-4 p-1 md:table-row-group md:space-y-0 md:p-0">
            {filteredFormats.length > 0 ? (
              filteredFormats.map((format: FormatOption, index: number) => {
                const isThisFormatDownloading = downloadingFormatId === format.format_id;
                return (
                  <tr
                    key={index}
                    className="border-line-light bg-base-secondary hover:bg-base-primary/50 flex flex-col rounded-2xl border p-4 shadow-sm transition md:table-row md:rounded-none md:border-x-0 md:border-t-0 md:bg-transparent md:p-0 md:shadow-none"
                  >
                    <td className="flex justify-between px-0 py-1.5 capitalize md:table-cell md:px-4 md:py-3">
                      <span className="font-medium text-stone-500 md:hidden">Type</span>
                      <span className="font-semibold md:font-normal">{selectedDownloadOption}</span>
                    </td>
                    <td className="flex justify-between px-0 py-1.5 uppercase md:table-cell md:px-4 md:py-3">
                      <span className="font-medium text-stone-500 md:hidden">Format</span>
                      <span className="font-semibold md:font-normal">
                        {format.mime_type.split(";")[0].split("/")[1] ||
                          (selectedDownloadOption === "video" ? "MP4" : "MP3")}
                      </span>
                    </td>
                    <td className="flex justify-between px-0 py-1.5 md:table-cell md:px-4 md:py-3">
                      <span className="font-medium text-stone-500 md:hidden">Quality</span>
                      <span className="text-action-primary font-bold md:font-semibold">{format.quality}</span>
                    </td>
                    <td className="flex justify-between px-0 py-1.5 md:table-cell md:px-4 md:py-3">
                      <span className="font-medium text-stone-500 md:hidden">Size</span>
                      <span className="font-semibold md:font-normal">
                        {(format.filesize ?? format.filesize_approx)
                          ? `${((format.filesize ?? format.filesize_approx ?? 0) / (1024 * 1024)).toFixed(2)} MB`
                          : "N/A"}
                      </span>
                    </td>
                    <td className="border-line-light mt-4 min-w-37.5 border-t border-dashed px-0 py-1 pt-4 md:mt-0 md:border-none md:px-4 md:py-3 md:pt-3">
                      {isThisFormatDownloading ? (
                        <div className="flex w-full flex-col gap-1 px-2 md:px-2">
                          <div className="flex justify-between text-xs font-medium text-stone-500">
                            <span>Downloading...</span>
                            <span>{downloadProgress}%</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
                            <div
                              className="bg-action-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${downloadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <Button
                          className="w-full rounded-xl md:rounded-md"
                          onClick={() => onDownloadClick(format.format_id)}
                          disabled={isSubmitting || isDownloading}
                        >
                          Download
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="block md:table-row">
                <td colSpan={5} className="block px-4 py-8 text-center text-stone-500 md:table-cell">
                  Tidak ada format {selectedDownloadOption} yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
