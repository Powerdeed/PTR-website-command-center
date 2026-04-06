import { apiRequest } from "@lib/api/apiRequest";
import {
  CategorizedProjects,
  Project,
  FetchedProject,
} from "../types/projects.types";

export const projects: Project[] = [
  {
    _id: "686f8a913673b0db0950398b",
    category: "Electrical Installation",
    name: "Commercial Office Wiring Upgrade",
    featuredImage: "expansionProject",
    images: [
      "expansionProject",
      "gridScale",
      "solarRural",
      "electricalInstallation",
    ],
    description:
      "Complete rewiring and electrical system upgrade for a multi-story commercial office building, ensuring compliance with modern safety standards.",
    status: "Completed",
    featured: true,
  },
  {
    _id: "686f8c333673b0db0950398d",
    category: "Electrical Installation",
    name: "Residential Smart Home Installation",
    featuredImage: "solarPower",
    images: [
      "solarPower",
      "electricalInstallation3",
      "electricalInstallation",
      "electricalInstallation2",
    ],
    description:
      "Installation of smart electrical systems, including automated lighting and energy-efficient wiring in a luxury residential estate.",
    status: "Ongoing",
    featured: false,
  },
  {
    _id: "686f955050a5c5fc27b617e2",
    category: "Electrical Installation",
    name: "Industrial Panel Board Replacement",
    featuredImage: "electricalInstallation3",
    images: [
      "electricalInstallation3",
      "electricalInstallation",
      "gridScale",
      "electricalInstallation2",
    ],
    description:
      "Replacement and commissioning of outdated industrial panel boards to improve reliability and safety in a manufacturing facility.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f95f450a5c5fc27b617ec",
    category: "Electrical Installation",
    name: "Hospital Emergency Power System",
    featuredImage: "electricalInstallation2",
    images: [
      "electricalInstallation2",
      "solarEnergy",
      "solarRural",
      "expansionProject",
    ],
    description:
      "Design and installation of a backup power system for critical care units in a regional hospital.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f962750a5c5fc27b617f0",
    category: "Electrical Installation",
    name: "School Electrical Renovation",
    featuredImage: "electricalInstallation3",
    images: [
      "electricalInstallation3",
      "gridScale",
      "solarRural",
      "solarRural",
    ],
    description:
      "Comprehensive electrical renovation for a public school, including new lighting, outlets, and surge protection.",
    status: "Ongoing",
    featured: false,
  },
  {
    _id: "686f967650a5c5fc27b617f4",
    category: "Solar Installation",
    name: "Commercial Rooftop Solar PV System",
    featuredImage: "hydrogenProduction",
    images: [
      "hydrogenProduction",
      "solarPanelImage",
      "solarEnergy",
      "solarPower",
    ],
    description:
      "Installation of a high-capacity rooftop solar photovoltaic system for a shopping mall.",
    status: "Completed",
    featured: true,
  },
  {
    _id: "686f969c50a5c5fc27b617f8",
    category: "Solar Installation",
    name: "Residential Solar Water Heating",
    featuredImage: "gridScale",
    images: ["gridScale", "solarResources", "hydrogenProduction", "solarPower"],
    description:
      "Integration of solar water heating panels in a residential housing project.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f96c250a5c5fc27b617fc",
    category: "Solar Installation",
    name: "Solar-Powered Irrigation System",
    featuredImage: "solarPower",
    images: ["solarPower", "expansionProject", "powerPost", "wasteRecycle"],
    description:
      "Design and implementation of a solar-powered irrigation system for an agricultural farm.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f96e750a5c5fc27b61800",
    category: "Solar Installation",
    name: "Grid-Tied Solar Power Plant",
    featuredImage: "hydrogenProduction",
    images: [
      "hydrogenProduction",
      "expansionProject",
      "electricalInstallation2",
      "wasteRecycle",
    ],
    description:
      "Construction and commissioning of a grid-tied solar power plant for a municipal utility.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f974e50a5c5fc27b61808",
    category: "Generators",
    name: "Hospital Standby Generator Installation",
    featuredImage: "hydrogenProduction",
    images: [
      "hydrogenProduction",
      "industrialCommercial",
      "solarPanelImage",
      "wasteRecycle",
    ],
    description:
      "Installation of high-capacity standby generators to ensure uninterrupted power supply for a hospital.",
    status: "Ongoing",
    featured: true,
  },
  {
    _id: "686f97a450a5c5fc27b6180c",
    category: "Generators",
    name: "Industrial Diesel Generator Upgrade",
    featuredImage: "expansionProject",
    images: ["expansionProject", "solarRural", "solarPanelImage", "powerPost"],
    description:
      "Upgrade and maintenance of diesel generators for a large-scale manufacturing plant.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f97e950a5c5fc27b61814",
    category: "Generators",
    name: "Commercial Generator Synchronization",
    featuredImage: "hydrogenProduction",
    images: [
      "hydrogenProduction",
      "solarEnergy",
      "electricalInstallation2",
      "electricalInstallation",
    ],
    description:
      "Synchronization of multiple generators for seamless power transfer in a commercial complex.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f981350a5c5fc27b61818",
    category: "Generators",
    name: "Data Center Backup Power Solution",
    featuredImage: "electricalInstallation3",
    images: [
      "electricalInstallation3",
      "electricalInstallation",
      "electricalInstallation2",
      "electricalInstallation3",
    ],
    description:
      "Design and installation of a backup generator system for a mission-critical data center.",
    status: "Completed",
    featured: false,
  },
  {
    _id: "686f983350a5c5fc27b6181c",
    category: "Generators",
    name: "Residential Estate Generator Supply",
    featuredImage: "expansionProject",
    images: [
      "expansionProject",
      "solarResources",
      "electricalInstallation2",
      "hydrogenProduction",
    ],
    description:
      "Supply and installation of backup generators for a gated residential estate.",
    status: "Ongoing",
    featured: false,
  },
  {
    _id: "686f985b50a5c5fc27b61820",
    category: "Automation",
    name: "Factory Process Automation Upgrade",
    featuredImage: "wasteRecycle",
    images: [
      "wasteRecycle",
      "powerPost",
      "industrialCommercial",
      "hydrogenProduction",
    ],
    description:
      "Upgrade of factory automation systems to improve production efficiency and reduce downtime.",
    status: "Completed",
    featured: true,
  },
  {
    _id: "686f987d50a5c5fc27b61824",
    category: "Automation",
    name: "Building Management System Integration",
    featuredImage: "gridScale",
    images: ["gridScale", "powerPost", "expansionProject", "wasteRecycle"],
    description:
      "Integration of a centralized building management system for automated control of HVAC, lighting, and security.",
    status: "Ongoing",
    featured: false,
  },
  {
    _id: "686f98a450a5c5fc27b61828",
    category: "Automation",
    name: "Automated Lighting Control",
    featuredImage: "solarRural",
    images: ["solarRural", "solarEnergy", "expansionProject", "gridScale"],
    description:
      "Design and installation of automated lighting control for a large-scale commercial project.",
    status: "Ongoing",
    featured: false,
  },
];

export const formattedProjectData = (projects: Project[]) => {
  const projectMap: CategorizedProjects = {};
  projects.forEach((project) => {
    if (!projectMap[project.category]) {
      projectMap[project.category] = [];
    }
    projectMap[project.category].push(project);
  });
  return projectMap;
};

export const getProjects = async (): Promise<CategorizedProjects> => {
  const projects = await apiRequest<FetchedProject[]>({
    method: "GET",
    url: "/projects",
  });

  const filteredProjects: Project[] = projects.map(
    ({ createdAt, updatedAt, ...rest }) => rest,
  );

  return formattedProjectData(filteredProjects);
};

export const getProject = async (projectId: string): Promise<Project> => {
  const project: FetchedProject = await apiRequest<FetchedProject>({
    method: "GET",
    url: `/projects/${projectId}`,
  });

  const { createdAt, updatedAt, ...rest } = project;

  return rest;
};

export const createProject = async (data: Project): Promise<Project> => {
  const project: FetchedProject = await apiRequest<FetchedProject>({
    method: "POST",
    url: `/projects`,
    data,
  });

  const { createdAt, updatedAt, ...rest } = project;

  return rest;
};

export const updateProject = async (
  projectId: string,
  data: Project,
): Promise<Project> => {
  const project: FetchedProject = await apiRequest<FetchedProject>({
    method: "PUT",
    url: `/projects/${projectId}`,
    data,
  });

  const { createdAt, updatedAt, ...rest } = project;

  return rest;
};

export const deleteProject = async (projectId: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/projects/${projectId}`,
  });
