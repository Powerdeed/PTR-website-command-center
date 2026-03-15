export const convertLabelToLink = (label: string) => {
  if (label.includes("&")) {
    // label separated with "&" e.g. "Leads & Inquiries" => "leads&inquiries"
    return label.toLocaleLowerCase().split(" ").join("");
  } else {
    // label separated with space e.g. "Website Content" => "website-content"
    return label.toLocaleLowerCase().split(" ").join("-");
  }
};

export const convertLinkToLabel = (link: string) => {
  if (link.includes("&")) {
    // link separated with "&" e.g. "leads&inquiries" => "Leads & Inquiries"
    return link
      .split("&")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" & ");
  } else {
    // link separated with "-" e.g. "website-content" => "Website Content"
    return link
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
};

export const sortBasedOnId = <T extends { id: string | number }>(
  arr: T[] = [],
): T[] => {
  return [...arr].sort((a, b) => {
    const ai = Number(a.id);
    const bi = Number(b.id);

    if (Number.isNaN(ai) && Number.isNaN(bi)) return 0;
    if (Number.isNaN(ai)) return 1;
    if (Number.isNaN(bi)) return -1;

    return ai - bi;
  });
};

export function to24Hour(time: string) {
  const [timePart, modifier] = time.split(" ");
  const hrMin = timePart.split(":").map(Number);

  if (modifier === "PM" && hrMin[0] !== 12) hrMin[0] += 12;
  if (modifier === "AM" && hrMin[0] === 12) hrMin[0] = 0;

  return `${hrMin[0].toString().padStart(2, "0")}:${hrMin[1]
    .toString()
    .padStart(2, "0")}`;
}

export function to12Hour(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  let hours = Number(hoursStr);
  const modifier = hours >= 12 ? "PM" : "AM";

  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return `${hours}:${minutes} ${modifier}`;
}

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

export const truncateString = (str: string, maxLength: number) => {
  // Check if the string's length is greater than the maximum allowed length
  if (str.length > maxLength) {
    // If it is, slice the string to the maxLength and append "..."
    return str.slice(0, maxLength) + "...";
  } else {
    // Otherwise, return the original string
    return str;
  }
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
