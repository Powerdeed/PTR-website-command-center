import { getProjects } from "@features/projects";

import { getCompanyStructureData } from "@features/webisteContent";

import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";

export interface AssetUsagePaths {
  "home page": string[];
  services: string[];
  "about structure": string[];
  "about certificates": never[];
  projects: string[];
  "contact page": string[];
}

export const assetUsagePaths: Promise<AssetUsagePaths> = (async () => {
  const companyStructure = await getCompanyStructureData();
  const projects = await getProjects();

  return {
    "home page": ["Hero", "about top", "about bottom"],
    services: companyServices,
    "about structure": (companyStructure.structure || []).flatMap(
      ({ levelName, positions }) =>
        positions.map((position) => `${levelName}-${position}`),
    ),
    "about certificates": [],
    projects: (projects || []).map(
      ({ category, name }) => `${category}-${name}`,
    ),
    "contact page": ["Hero"],
  };
})();
