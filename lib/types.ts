import { companyServices } from "@/utils/constants/UI-data-constants";

export interface Service {
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
