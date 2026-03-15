export type Contacts = {
  Hero: {
    image: string;
    title: string;
    subtitle: string;
  };
  Location: {
    Address: string;
    City: string;
    Town: string;
    Country: string;
  };
  ContactInformation: {
    Phone: string[];
    Email: string[];
  };
  "working-hours": {
    [key: string]: {
      from: string;
      to: string;
    } | null;
  };
  Socials: [string, string][];
};

export const contacts: Contacts = {
  Hero: {
    image: "/images/agreement.png",
    title: "Let's Talk",
    subtitle:
      "Whether you have a question, feedback, or just want to say hello, we'd love to hear from you!",
  },
  Location: {
    Country: "Kenya",
    City: "Nyeri",
    Town: "Nyeri town",
    Address: "Wakiawa House",
  },
  ContactInformation: {
    Phone: ["+254 722 316 721", "+254 722 316 721"],
    Email: [
      "powerdeedtechnologies@gmail.com",
      "powerdeedtechnologies@gmail.com",
    ],
  },
  "working-hours": {
    Weekdays: {
      from: "8:00 AM",
      to: "6:00 PM",
    },
    Saturday: {
      from: "9:00 AM",
      to: "2:00 PM",
    },
    Sunday: null,
  },
  Socials: [
    [
      "LinkedIn",
      "https://www.linkedin.com/in/alfred-kuria-58199a106/?originalSubdomain=ke",
    ],
    [
      "WhatsApp",
      "https://wa.me/254722316721?text=Hi%2C%20I%20found%20you%20on%20the%20website",
    ],
  ],
};
