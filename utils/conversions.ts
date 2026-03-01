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
