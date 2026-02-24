export type AboutIntro = {
  title: string;
  description: string;
  image: string;
  flipped: boolean;
};

export const hero = {
  title: "Powering Kenya's Future: Expert Electrical & Solar Solutions",
  subtitle:
    "Delivering reliable electrical engineering and solar energy solutions across Kenya.",
  image: "/images/PES-site-image.jpg",
};

export const aboutIntro: AboutIntro[] = [
  {
    title: "With over 15 years of experience",
    description:
      "Powerdeed is your trusted engineering partner, delivering reliable, high-quality electrical and solar solutions with the latest technologies and a team of certified professionals. We blend deep technical expertise with a customer-centric approach—ensuring every system we design, install, and maintain meets the highest standards of safety, efficiency, and performance.",
    image: "about-into/elecJobsConstruction",
    flipped: false,
  },
  {
    title: "Our Mission & Vision",
    description:
      "We’re committed to empowering Kenya’s growth through sustainable, innovative engineering. Our mission is to uphold excellence, integrity, and professionalism in every project—leveraging cutting-edge renewable energy and smart electrical systems to build tomorrow’s infrastructure today.",
    image: "about-into/missionVision",
    flipped: true,
  },
];
