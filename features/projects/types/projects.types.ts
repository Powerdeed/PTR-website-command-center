import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";

export interface FetchedProject {
  _id: string;
  category: (typeof companyServices)[number];
  name: string;
  featuredImage: string;
  images: string[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  category: (typeof companyServices)[number];
  name: string;
  featuredImage: string;
  images: string[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
}

export interface CategorizedProjects {
  [key: Project["category"]]: Project[];
}
