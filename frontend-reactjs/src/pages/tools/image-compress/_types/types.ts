export type CompressionLevel = "low" | "medium" | "high";

export type FileItem = {
  id: string;
  file: File;
  status: "idle" | "compressing" | "done" | "error";
  originalSize: number;
  compressedSize?: number;
  progress: number;
  compressedUrl?: string;
};
