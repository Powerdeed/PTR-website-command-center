export const convertLabelToLink = (label: string) => {
  if (label.includes("&")) {
    // label separated with "&" e.g. "Leads & Inquiries" => "leads&inquiries"
    return label.toLocaleLowerCase().split(" ").join("");
  } else {
    // label separated with space e.g. "Website Content" => "website-content"
    return label.toLocaleLowerCase().split(" ").join("-");
  }
};
