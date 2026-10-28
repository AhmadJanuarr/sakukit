export interface InfoResponse {
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  formats: FormatOption[];
}

export interface FormatOption {
  format_id: string;
  quality: string;
  mime_type: string;
  has_video: boolean;
  has_audio: boolean;
  audio_channels: number;
  filesize: number;
  filesize_approx?: number;
}

export type DownloadOptions = "audio" | "video";
