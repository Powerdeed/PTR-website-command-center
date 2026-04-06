import { Service } from "../types/services.types";

export const DEFAULT_SERVICE: Service = {
  name: "",
  description: "",
  imageUrl: "",
  status: false,
};

export const SERVICE_FIELDS: Array<Exclude<keyof Service, "status" | "id">> = [
  "name",
  "description",
  "imageUrl",
];
