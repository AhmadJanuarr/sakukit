import { MAX_FILE_SIZE, MAX_FILES, SUPPORTED_FORMATS } from "@/constants/image-uploader";

type RejectionReason = "unsupported-format" | "file-too-large" | "duplicate" | "max-files";

type RejectedFile = {
  file: File;
  reason: RejectionReason;
};

type ValidationResult = {
  acceptedFiles: File[];
  rejectedFiles: RejectedFile[];
};

export const validateImageFiles = (
  incomingFiles: readonly File[],
  existingFiles: readonly File[],
): ValidationResult => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: RejectedFile[] = [];
  const seenFiles = new Set(existingFiles.map((file) => `${file.name}:${file.size}:${file.lastModified}`));
  let availableSlots = Math.max(0, MAX_FILES - existingFiles.length);

  for (const file of incomingFiles) {
    const identity = `${file.name}:${file.size}:${file.lastModified}`;

    if (!SUPPORTED_FORMATS.includes(file.type)) {
      rejectedFiles.push({ file, reason: "unsupported-format" });
    } else if (file.size > MAX_FILE_SIZE) {
      rejectedFiles.push({ file, reason: "file-too-large" });
    } else if (seenFiles.has(identity)) {
      rejectedFiles.push({ file, reason: "duplicate" });
    } else if (availableSlots === 0) {
      rejectedFiles.push({ file, reason: "max-files" });
    } else {
      acceptedFiles.push(file);
      seenFiles.add(identity);
      availableSlots -= 1;
    }
  }

  return { acceptedFiles, rejectedFiles };
};
