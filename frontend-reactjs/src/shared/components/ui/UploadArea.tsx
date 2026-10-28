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
      className="z-0 flex min-h-96 w-full cursor-pointer flex-col items-center justify-center gap-4 transition-all duration-300"
    >
      <div className="text-action-primary flex flex-col items-center justify-center gap-4 text-center text-base">
        <LuCloudUpload className="size-18" />
        <p>Pilih gambar atau Drag & Drop</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="file-upload"
        onChange={onChangeHandler}
      />
      <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:gap-5">
        <Button label="file-upload">
          <LuFilePlus className="size-6" /> Pilih File
        </Button>
        <span className="text-ink-secondary text-sm italic">
          ⓘ Informasi: Maks. 5 MB/file • Maks. 5 gambar sekaligus
        </span>
      </div>
    </div>
  );
};
