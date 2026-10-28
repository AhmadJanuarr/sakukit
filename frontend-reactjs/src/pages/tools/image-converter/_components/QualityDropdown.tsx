import { RefObject } from "react";

export const QualityDropdown = ({
  quality,
  localQuality,
  setQuality,
  setLocalQuality,
  qualityOptionsRef,
}: {
  quality: number;
  localQuality: number;
  setQuality: (val: number) => void;
  setLocalQuality: (val: number) => void;
  qualityOptionsRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={qualityOptionsRef}
      className="bg-base-secondary border-line-light absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border p-4 shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Kualitas : </span>
          <span className="text-action-primary text-sm font-medium">
            {quality}%
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={localQuality}
            onChange={(e) => setLocalQuality(Number(e.target.value))}
            onMouseUp={(e) =>
              setQuality(Number((e.target as HTMLInputElement).value))
            }
            onTouchEnd={(e) =>
              setQuality(Number((e.target as HTMLInputElement).value))
            }
            className="h-2 w-full cursor-pointer rounded-lg"
          />
          <div className="mt-1 flex justify-between text-xs">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
