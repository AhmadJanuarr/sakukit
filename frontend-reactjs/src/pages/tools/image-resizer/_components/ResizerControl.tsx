import { Button } from "@/shared/components/ui/Button";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useState } from "react";
import { LuLock, LuLockOpen } from "react-icons/lu";

const PRESETS = [
  { label: "Instagram (1:1)", width: 1080, height: 1080 },
  { label: "Story (9:16)", width: 1080, height: 1920 },
  { label: "Full HD (16:9)", width: 1920, height: 1080 },
  { label: "HD (16:9)", width: 1280, height: 720 },
];

interface ResizerControlsProps {
  width: number;
  height: number;
  originalSize: { width: number; height: number } | null;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onCancel: () => void;
  onResize: () => void;
  isResizing: boolean;
}

export const ResizerControls = ({
  width,
  height,
  originalSize,
  isResizing,
  onCancel,
  onWidthChange,
  onHeightChange,
  onResize,
}: ResizerControlsProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleWidthChange = (newWidth: number) => {
    onWidthChange(newWidth);
    if (isLocked && width > 0 && height > 0) {
      const ratio = height / width;
      onHeightChange(Math.round(newWidth * ratio));
    }
    setActivePreset(null);
  };

  const handleHeightChange = (newHeight: number) => {
    if (isLocked && width > 0 && height > 0) {
      const ratio = width / height;
      onWidthChange(Math.round(newHeight * ratio));
    }
    onHeightChange(newHeight);
    setActivePreset(null);
  };

  const handlePresetClick = (preset: (typeof PRESETS)[0]) => {
    onWidthChange(preset.width);
    onHeightChange(preset.height);
    setActivePreset(preset.label);
  };

  const handleReset = () => {
    if (originalSize) {
      onWidthChange(originalSize.width);
      onHeightChange(originalSize.height);
      setActivePreset(null);
    }
  };

  const { openModal, closeModal } = useModalStore();
  const handleCancelFile = () => {
    openModal({
      title: "Apakah Anda yakin ingin membatalkan?",
      content: (
        <div className="space-y-4">
          <p className="text-ink-secondary text-sm">
            Semua perubahan yang belum disimpan akan hilang. Apakah Anda yakin ingin membatalkan?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="border-line-strong text-ink-primary hover:bg-base-primary rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onCancel();
              }}
              className="bg-ink-danger rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Ya, Batalkan
            </button>
          </div>
        </div>
      ),
    });
  };
  return (
    <div className="border-line-light bg-base-secondary/10 flex w-full shrink-0 flex-col justify-between rounded-xl border p-5 md:w-85">
      <div className="flex flex-col gap-6">
        <div className="flex items-end gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs font-medium">Lebar (px)</label>
            <input
              type="number"
              value={width || ""}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="border-line-light bg-base-primary text-ink-primary focus:border-action-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`border-line-light flex h-9.5 w-9.5 items-center justify-center rounded-lg border transition-colors ${
              isLocked
                ? "bg-action-primary/10 text-action-primary border-action-primary/30"
                : "hover:text-action-primary"
            }`}
            title={isLocked ? "Buka Kunci Presisi" : "Kunci Presisi"}
          >
            {isLocked ? <LuLock size={16} /> : <LuLockOpen size={16} />}
          </button>
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs font-medium">Tinggi (px)</label>
            <input
              type="number"
              value={height || ""}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="border-line-light bg-base-primary text-ink-primary focus:border-action-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Preset Ukuran</label>
            <button
              onClick={handleReset}
              className="text-action-primary text-xs font-medium hover:underline"
              disabled={!originalSize}
            >
              Reset ke Asli
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                  activePreset === preset.label
                    ? "border-action-primary bg-action-primary text-base-primary"
                    : "border-line-light bg-base-primary hover:border-action-primary"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-line-light mt-8 flex w-full justify-end gap-3 border-t pt-5">
        <Button variant="outline" onClick={handleCancelFile} disabled={isResizing}>
          Batal
        </Button>
        <Button variant="default" onClick={onResize} disabled={isResizing || !width || !height}>
          {isResizing ? "Memproses..." : "Resize Gambar"}
        </Button>
      </div>
    </div>
  );
};
