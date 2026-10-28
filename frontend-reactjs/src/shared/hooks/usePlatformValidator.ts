import { toast } from "sonner";
import { useSoundEffect } from "./useSoundEffect";

const PLATFORM_DOMAINS: Record<string, string[]> = {
  youtube: ["youtube.com", "youtu.be"],
  tiktok: ["tiktok.com"],
  instagram: ["instagram.com"],
};

export const usePlatformValidator = (platform: string) => {
  const errorSound = useSoundEffect("/sounds/error.mp3");
  const validateURL = (url: string) => {
    const validDomains = PLATFORM_DOMAINS[platform] || [`${platform}.com`];
    const isValid = validDomains.some((domain) => url.includes(domain));
    if (!isValid) {
      const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
      errorSound?.play();
      toast.error(`URL tidak valid. Pastikan Anda memasukkan URL ${platformName} yang benar.`);
      return false;
    }

    return true;
  };
  return { validateURL };
};
