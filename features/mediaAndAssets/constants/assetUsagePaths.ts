import { projects } from "@features/projects";
import { companyStructure } from "@features/webisteContent";
import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";

export const assetUsagePaths: Record<string, string[]> = {
  "home page": ["Hero", "about top", "about bottom"],
  services: companyServices,
  "about structure": companyStructure.flatMap(({ levelName, positions }) =>
    positions.map((position) => `${levelName}-${position}`),
  ),
  "about certificates": [],
  projects: projects.map(({ category, name }) => `${category}-${name}`),
  "contact page": ["Hero"],
};
