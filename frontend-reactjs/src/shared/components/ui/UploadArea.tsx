import { useRef } from "react";
import { LuCloudUpload, LuFilePlus } from "react-icons/lu";
import { Button } from "./Button";

export const UploadArea = ({
  onChangeHandler,
  isProcessing,
  pendingFileCount,
  variant,
}: {
  variant?: "default" | "resize";
  isProcessing?: boolean;
  pendingFileCount?: number;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("label")) {
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleContainerClick}
      className="z-0 flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:min-h-64 sm:flex-row sm:gap-6 sm:px-6 sm:py-8 sm:text-left"
    >
      <div className="bg-base-primary rounded-full border p-3 sm:p-4">
        <LuCloudUpload className="size-8 sm:size-10" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-base font-semibold sm:text-lg">Tarik gambar ke sini</span>
        <span className="text-ink-secondary text-xs sm:text-sm">
          Informasi: Maks. 5 MB/file • Maks. 5 gambar sekaligus
        </span>
      </div>
      <div className="w-full sm:w-auto">
        <Button className="w-full px-4 py-5.5 sm:w-auto" onClick={() => fileInputRef.current?.click()}>
          <LuFilePlus className="size-6" /> Pilih File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};
