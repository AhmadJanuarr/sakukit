export const formatDuration = (duration?: string | number): string => {
  if (!duration) return "00:00";

  const durationStr = String(duration);
  if (durationStr.includes(":")) return durationStr;

  const totalSeconds = parseInt(durationStr, 10);
  if (isNaN(totalSeconds)) return "00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
};
