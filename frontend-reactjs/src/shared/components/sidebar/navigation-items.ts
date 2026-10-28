import { IconType } from "react-icons";
import { LuCircleHelp } from "react-icons/lu";
import { PiSparkleLight } from "react-icons/pi";
import { RxBookmark, RxCube, RxHome } from "react-icons/rx";

export interface NavLink {
  to: string;
  icon: IconType;
  label: string;
  isAvailable?: boolean;
  section: "main" | "footer";
}

export const SIDEBAR_ITEMS: NavLink[] = [
  {
    to: "/",
    label: "Beranda",
    icon: RxHome,
    isAvailable: true,
    section: "main",
  },
  {
    to: "/tools",
    label: "Semua Alat",
    icon: RxCube,
    isAvailable: true,
    section: "main",
  },
  {
    to: "/highlight",
    label: "Highlight",
    icon: RxBookmark,
    isAvailable: true,
    section: "main",
  },
  {
    to: "/changelog",
    label: "Yang Baru",
    icon: PiSparkleLight,
    isAvailable: true,
    section: "footer",
  },
  {
    to: "/help",
    label: "Bantuan & Masukan",
    icon: LuCircleHelp,
    isAvailable: true,
    section: "footer",
  },
];
