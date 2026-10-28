import { DownloadOptions, FormatOption } from "../types/downloader_option";
import { getFormatExtension } from "./format-extension";

export const getFilteredFormats = (formats: FormatOption[], selectedOption: DownloadOptions) => {
  if (!formats || formats.length === 0) return [];
  const uniqueFormats = new Map<string, FormatOption>();
  const isVideoOption = selectedOption === "video";

  formats.forEach((f: FormatOption) => {
    if (!f.quality) return;
    const matchesType = isVideoOption ? f.has_video : !f.has_video && f.has_audio;
    if (matchesType) {
      const mapKey = isVideoOption ? f.quality : getFormatExtension(f.mime_type, selectedOption);
      const existingFormat = uniqueFormats.get(mapKey);
      if (!existingFormat) {
        uniqueFormats.set(mapKey, f);
      } else {
        if (isVideoOption) {
          if (existingFormat.mime_type.includes("webm") && f.mime_type.includes("mp4")) {
            uniqueFormats.set(mapKey, f);
          }
        } else {
          const currentSize = f.filesize || 0;
          const existingSize = existingFormat.filesize || 0;
          if (currentSize > existingSize) {
            uniqueFormats.set(mapKey, f);
          }
        }
      }
    }
  });

  const results = Array.from(uniqueFormats.values());
  if (isVideoOption) {
    results.sort((a, b) => {
      const resA = parseInt(a.quality.replace(/\D/g, "")) || 0;
      const resB = parseInt(b.quality.replace(/\D/g, "")) || 0;
      return resB - resA;
    });
  }
  return results;
};
