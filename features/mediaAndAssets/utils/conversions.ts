import { getMediaAssets } from "../services/mediaAssets";

export const mediaType = (url?: string) => {
  if (!url || typeof url !== "string") return "unknown";

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".avif",
  ];

  const diagramExtensions = [".svg"];

  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".mkv",
    ".webm",
  ];

  const docExtensions = [".pdf", ".docx", ".doc", ".csv"];

  for (const ext of imageExtensions) {
    if (url.toLowerCase().includes(ext)) return "image";
  }

  for (const ext of videoExtensions) {
    if (url.toLowerCase().includes(ext)) return "video";
  }

  for (const ext of docExtensions) {
    if (url.toLowerCase().includes(ext)) return "document";
  }

  for (const ext of diagramExtensions) {
    if (url.toLowerCase().includes(ext)) return "diagram";
  }

  return "unknown";
};

export function getCurrentDateFormatted() {
  const date = new Date();

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
}

export const sizeOfFile = (bytes: number) => {
  if (bytes < 1000) return `${bytes} Bytes`;
  if (bytes < 1000000) return `${(bytes / 1000).toFixed(2)} KB`;
  return `${(bytes / 1000000).toFixed(2)} MB`;
};

export const toCamelCase = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getTotalUsedSpace = () => {
  const total = getMediaAssets().reduce((acc, asset) => {
    const [value, unit] = asset.size.split(" ");

    let sizeInMB = Number(value);

    if (unit === "KB") sizeInMB /= 1024;
    if (unit === "GB") sizeInMB *= 1024;

    return acc + sizeInMB;
  }, 0);

  return parseFloat(total.toFixed(2));
};
