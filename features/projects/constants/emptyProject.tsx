import { Project } from "../types/projects.types";

export const EMPTY_PROJECT: Project = {
  id: crypto.randomUUID(),
  category: "",
  name: "",
  description: "",
  images: [""],
  status: "Ongoing",
  featured: false,
};
