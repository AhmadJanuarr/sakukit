import { ColorPalette } from "@/constants/tools-catalog";
import { IconType } from "react-icons";

interface IconBoxProps {
  icon: IconType;
  palette?: ColorPalette;
  className?: string;
}

export const IconBox = ({ icon: Icon, palette, className = "" }: IconBoxProps) => {
  return (
    <div
      className={`bg-base-primary border-line-strong inline-flex items-center justify-center rounded-xl border p-1.5 ${className}`}
    >
      <div
        className="border-line-strong flex items-center justify-center rounded-lg border p-3"
        style={{
          backgroundColor: palette?.bg,
          color: palette?.icon,
        }}
      >
        <Icon className="size-6" />
      </div>
    </div>
  );
};
