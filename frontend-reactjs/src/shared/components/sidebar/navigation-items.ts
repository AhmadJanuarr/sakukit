import {
  PiArrowsIn,
  PiArrowsLeftRight,
  PiEraser,
  PiFilePdf,
  PiFiles,
  PiImage,
  PiScissors,
  PiTextT,
} from "react-icons/pi";
import { RiInstagramLine, RiTiktokLine, RiYoutubeLine } from "react-icons/ri";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface NavLink {
  to: string;
  icon: IconType;
  label: string;
  isAvailable?: boolean;
}

export interface NavGroup {
  category: string;
  links: NavLink[];
}

export const NAVIGATION_ITEMS: NavGroup[] = [
  {
    category: "Alat Gambar",
    links: [
      { to: "/tools/image-compress", icon: PiArrowsIn, label: "Kompres Gambar", isAvailable: true },
      { to: "/tools/image-resizer", icon: PiImage, label: "Ubah Ukuran Gambar", isAvailable: true },
      { to: "/tools/image-converter", icon: PiArrowsLeftRight, label: "Konversi Format", isAvailable: true },
      { to: "/tools/remove-background", icon: PiEraser, label: "Hapus Latar Belakang", isAvailable: true },
    ],
  },
  {
    category: "Pengunduh Video",
    links: [
      { to: "/tools/youtube", icon: RiYoutubeLine, label: "YouTube", isAvailable: true },
      { to: "/tools/tiktok", icon: RiTiktokLine, label: "TikTok", isAvailable: true },
      { to: "/tools/instagram", icon: RiInstagramLine, label: "Instagram", isAvailable: true },
    ],
  },
  {
    category: "Alat PDF",
    links: [
      { to: "/tools/pdf-merge", icon: PiFiles, label: "Gabungkan PDF", isAvailable: false },
      { to: "/tools/pdf-split", icon: PiScissors, label: "Pisahkan PDF", isAvailable: false },
      { to: "/tools/pdf-to-image", icon: PiFilePdf, label: "PDF ke Gambar", isAvailable: false },
      { to: "/tools/pdf-extract", icon: PiTextT, label: "Ekstrak Teks", isAvailable: false },
    ],
  },
];
