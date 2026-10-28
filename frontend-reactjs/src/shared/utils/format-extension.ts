import { DownloadOptions } from "../types/downloader_option";

export const getFormatExtension = (mimeType: string, option: DownloadOptions): string => {
  const ext = mimeType.split(";")[0]?.split("/")[1];
  if (ext) return ext.toLowerCase();
  return option === "video" ? "mp4" : "mp3";
};
