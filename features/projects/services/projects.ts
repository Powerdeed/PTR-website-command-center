import { apiRequest } from "@lib/api/apiRequest";
import {
  CategorizedProjects,
  Project,
  FetchedProject,
} from "../types/projects.types";

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

export const getProjects = async (): Promise<Project[]> =>
  await apiRequest<FetchedProject[]>({
    method: "GET",
    url: "/projects",
  });

export const getProject = async (projectId: string): Promise<Project> =>
  await apiRequest<FetchedProject>({
    method: "GET",
    url: `/projects/${projectId}`,
  });

export const createProject = async (data: Project): Promise<Project> =>
  await apiRequest<FetchedProject>({
    method: "POST",
    url: `/projects`,
    data,
  });

export const updateProject = async (
  projectId: string,
  data: Project,
): Promise<Project> =>
  await apiRequest<FetchedProject>({
    method: "PUT",
    url: `/projects/${projectId}`,
    data,
  });

export const deleteProject = async (projectId: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/projects/${projectId}`,
  });
