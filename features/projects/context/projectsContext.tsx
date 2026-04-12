"use client";

import { createContext, Dispatch } from "react";
import { CategorizedProjects, Project } from "../types/projects.types";

type projectState = {
  projects: CategorizedProjects | null;
  setProjects: Dispatch<React.SetStateAction<CategorizedProjects | null>>;

  selectedProject: Project | null;
  setSelectedProject: Dispatch<React.SetStateAction<Project | null>>;

  selectedProjectPrev: Project | null;
  setSelectedProjectPrev: Dispatch<React.SetStateAction<Project | null>>;

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

  hasProjectChanged: boolean;
  setHasProjectChanged: Dispatch<React.SetStateAction<boolean>>;
};

export const projectContext = createContext<projectState | null>(null);
