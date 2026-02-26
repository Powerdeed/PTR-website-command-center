export type AboutIntro = {
  title: string;
  description: string;
  image: string;
  flipped: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: string;
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

export const testimonials: Testimonial[] = [
  {
    id: "6870da6360461b0545bb47e6",
    name: "John Doe",
    position: "CEO",
    industry: "Acme Corp",
    testimonial:
      "Powerdeed exceeded our expectations with their professionalism and expertise.",
    profilePic: "profile-image",
  },
  {
    id: "6870e4f7e43b11bdb76674b5",
    name: "Jane Smith",
    position: "Resident",
    industry: "Project Manager",
    testimonial: "The team was friendly and efficient. Highly recommended!",
    profilePic: "profile-image",
  },
  {
    id: "6870e52d5f5d5c2b57831af2",
    name: "Michael Brown",
    position: "Facility Manager",
    industry: "Facility Management",
    testimonial: "Their solutions are reliable and cost-effective.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5435f5d5c2b57831af5",
    name: "Emily White",
    position: "Homeowner",
    industry: "Residential",
    testimonial: "I am very satisfied with the service provided by Powerdeed.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5545f5d5c2b57831af8",
    name: "David Green",
    position: "Business Owner",
    industry: "Commercial",
    testimonial: "Prompt response and excellent customer care.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5795f5d5c2b57831afb",
    name: "Sophia Lee",
    position: "Resident",
    industry: "Residential",
    testimonial: "They made the whole process seamless and easy.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5a55f5d5c2b57831afe",
    name: "Olivia Brown",
    position: "Property Manager",
    industry: "Olivia Corp",
    testimonial: "We will definitely work with Powerdeed again.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5b85f5d5c2b57831b01",
    name: "Daniel Kim",
    position: "Resident",
    industry: "Residential",
    testimonial: "Great value for money and top-notch service.",
    profilePic: "profile-image",
  },
  {
    id: "6870e5cb5f5d5c2b57831b04",
    name: "Grace Wilson",
    position: "CEO",
    industry: "Wilson Enterprises",
    testimonial: "Professional, reliable, and trustworthy.",
    profilePic: "profile-image",
  },
];
