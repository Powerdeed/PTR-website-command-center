import { NewService } from "../types/services.types";

export const DEFAULT_SERVICE: NewService = {
  name: "",
  description: "",
  imageUrl: "",
  status: false,
};

export const SERVICE_FIELDS: Array<Exclude<keyof NewService, "status" | "id">> =
  ["name", "description", "imageUrl"];
