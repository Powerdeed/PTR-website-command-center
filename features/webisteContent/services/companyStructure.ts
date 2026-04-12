import { apiRequest } from "@lib/api/apiRequest";

import { CompanyStructure } from "../types/aboutPage.types";

export const getCompanyStructureData = () =>
  apiRequest<{ _id: string; structure: CompanyStructure[] }>({
    method: "GET",
    url: "/company-structure",
  });

export const updateCompanyStructureData = (data: CompanyStructure[]) =>
  apiRequest<{ structure: CompanyStructure[] }>({
    method: "PUT",
    url: "/company-structure",
    data: { structure: data },
  });
