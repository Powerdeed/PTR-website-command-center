import { companyServices } from "@global-utils/constants/COMPANY_PROVISIONS";

export interface Project {
  id: string;
  category: (typeof companyServices)[number];
  name: string;
  images: string[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
}
