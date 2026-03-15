export type CompanyStructure = {
  id: string;
  levelName: string;
  positions: string[];
};

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
