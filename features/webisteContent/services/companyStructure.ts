import { apiRequest } from "@lib/api/apiRequest";
import { CompanyStructure } from "../types/aboutPage.types";

export const companyStructure: CompanyStructure[] = [
  {
    id: "1",
    levelName: "Executive Leadership",
    positions: [
      "Chief Executive Officer",
      "Chief Operations Officer",
      "Chief Technology Officer",
    ],
  },
  {
    id: "2",
    levelName: "Department Heads",
    positions: [
      "Engineering Director",
      "Project Management Director",
      "Quality Assurance Manager",
    ],
  },
  {
    id: "3",
    levelName: "Senior Engineers",
    positions: [
      "Senior Structural Engineer",
      "Senior Electrical Engineer",
      "Senior Mechanical Engineer",
    ],
  },
  {
    id: "4",
    levelName: "Engineering Team",
    positions: ["Project Engineers", "Design Engineers", "Field Engineers"],
  },
  {
    id: "5",
    levelName: "Support Staff",
    positions: [
      "Administrative Team",
      "Technical Support",
      "Business Development",
    ],
  },
];

export const getCompanyStructureData = () =>
  apiRequest<{ _id: string; structure: CompanyStructure[] }[]>({
    method: "GET",
    url: "/company-structure",
  });

export const updateCompanyStructureData = (
  dataId: string,
  data: CompanyStructure[],
) =>
  apiRequest<CompanyStructure[]>({
    method: "PUT",
    url: `/company-structure/${dataId}`,
    data: { structure: data },
  });
