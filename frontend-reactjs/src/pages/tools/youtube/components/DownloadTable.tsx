// file: DownloadTable.tsx
import { Button } from "@/shared/components/ui/Button";
import { DownloadOptions, FormatOption } from "@/shared/types/downloader_option";
import { FormatBytes } from "@/shared/utils/format-bytes";
import { getFormatExtension } from "@/shared/utils/format-extension";

interface DownloadTableProps {
  selectedDownloadOption: DownloadOptions;
  filteredFormats: FormatOption[];
  downloadingFormatId: string | null;
  isSubmitting: boolean;
  isDownloading: boolean;
  onDownloadClick: (formatId: string, extension: string, fileSize: number) => void;
}

interface DownloadRowProps {
  format: FormatOption;
  selectedDownloadOption: DownloadOptions;
  isThisFormatDownloading: boolean;
  isDisabled: boolean;
  onDownloadClick: (formatId: string, extension: string, fileSize: number) => void;
}

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="flex w-full flex-col gap-1 px-2 md:px-2">
    <div className="flex justify-between text-xs font-medium text-stone-500">
      <span>Downloading...</span>
      <span>{progress}%</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
      <div
        className="bg-action-primary h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const DownloadRow = ({
  format,
  selectedDownloadOption,
  isThisFormatDownloading,
  isDisabled,
  onDownloadClick,
}: DownloadRowProps) => {
  const fileSize = FormatBytes(format.filesize ?? format.filesize_approx);
  const extension = getFormatExtension(format.mime_type, selectedDownloadOption);

  return (
    <tr className="border-line-light bg-base-secondary hover:bg-base-primary/50 flex flex-col rounded-2xl border p-4 shadow-sm transition md:table-row md:rounded-none md:border-x-0 md:border-t-0 md:bg-transparent md:p-0 md:shadow-none">
      <td className="flex justify-between px-0 py-1.5 capitalize md:table-cell md:px-4 md:py-3">
        <span className="font-medium text-stone-500 md:hidden">Type</span>
        <span className="font-semibold md:font-normal">{selectedDownloadOption}</span>
      </td>

      <td className="flex justify-between px-0 py-1.5 uppercase md:table-cell md:px-4 md:py-3">
        <span className="font-medium text-stone-500 md:hidden">Format</span>
        <span className="font-semibold md:font-normal">{extension}</span>
      </td>

      <td className="flex justify-between px-0 py-1.5 md:table-cell md:px-4 md:py-3">
        <span className="font-medium text-stone-500 md:hidden">Quality</span>
        <span className="font-bold md:font-semibold">{format.quality}</span>
      </td>

      <td className="flex justify-between px-0 py-1.5 md:table-cell md:px-4 md:py-3">
        <span className="font-medium text-stone-500 md:hidden">Size</span>
        <span className="font-semibold md:font-normal">{fileSize}</span>
      </td>

      <td className="border-line-light mt-4 min-w-37.5 border-t border-dashed px-0 py-1 pt-4 md:mt-0 md:border-none md:px-4 md:py-3 md:pt-3">
        <Button
          className="w-full rounded-xl md:rounded-md"
          onClick={() => onDownloadClick(format.format_id, extension, format.filesize ?? format.filesize_approx)}
          disabled={isDisabled}
        >
          {isThisFormatDownloading ? "Membuka..." : "Download"}
        </Button>
      </td>
    </tr>
  );
};

export const DownloadTable = ({
  selectedDownloadOption,
  filteredFormats,
  downloadingFormatId,
  isSubmitting,
  isDownloading,
  onDownloadClick,
}: DownloadTableProps) => {
  const isActionDisabled = isSubmitting || isDownloading;
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border">
      <table className="block w-full text-left text-sm md:table">
        <thead className="bg-base-secondary hidden border-b md:table-header-group">
          <tr className="border-line-strong uppercase">
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Format</th>
            <th className="px-4 py-3 font-medium">Quality</th>
            <th className="px-4 py-3 font-medium">File Size</th>
            <th className="px-4 py-3 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="block space-y-4 p-1 md:table-row-group md:space-y-0 md:p-0">
          {filteredFormats.length > 0 ? (
            filteredFormats.map((format) => (
              <DownloadRow
                key={format.format_id}
                format={format}
                selectedDownloadOption={selectedDownloadOption}
                isThisFormatDownloading={downloadingFormatId === format.format_id}
                isDisabled={isActionDisabled}
                onDownloadClick={onDownloadClick}
              />
            ))
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
  );
};
