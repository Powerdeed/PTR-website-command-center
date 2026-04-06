"use client";

import { createContext, Dispatch } from "react";
import { CategorizedProjects, Project } from "../types/projects.types";

type projectState = {
  projectsObj: CategorizedProjects | null;
  setProjectsObj: Dispatch<React.SetStateAction<CategorizedProjects | null>>;

  selectedProject: Project | null;
  setSelectedProject: Dispatch<React.SetStateAction<Project | null>>;

  selectedProjectId: string;
  setSelectedProjectId: Dispatch<React.SetStateAction<string>>;

  isNewProject: boolean;
  setisNewProject: Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: Dispatch<React.SetStateAction<string>>;

  getProjectsError: string;
  setGetProjectsError: Dispatch<React.SetStateAction<string>>;

  isUploading: boolean;
  setIsUploading: Dispatch<React.SetStateAction<boolean>>;

  isDeleting: boolean;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;

  selectedCategory: string;
  setSelectedCategory: Dispatch<React.SetStateAction<string>>;

  featuredState: boolean;
  setFeaturedState: Dispatch<React.SetStateAction<boolean>>;

  completedState: boolean;
  setCompletedState: Dispatch<React.SetStateAction<boolean>>;

  refreshProjects: boolean;
  setRefreshProjects: Dispatch<React.SetStateAction<boolean>>;
};

export const projectContext = createContext<projectState | null>(null);
