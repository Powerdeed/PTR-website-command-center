import { companyServices } from "@services/services";

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: boolean;
}

export interface Project {
  id: string;
  category: (typeof companyServices)[number];
  name: string;
  images: string[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
}
