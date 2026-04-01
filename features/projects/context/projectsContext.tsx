"use client";

import { createContext, Dispatch } from "react";
import { Project } from "../types/projects.types";

type projectState = {
  projectsObj: Record<string, Project[]>;
  setProjectsObj: Dispatch<React.SetStateAction<Record<string, Project[]>>>;

  selectedProject: Project;
  setSelectedProject: Dispatch<React.SetStateAction<Project>>;

  isAddingNewProject: boolean;
  setisAddingNewProject: Dispatch<React.SetStateAction<boolean>>;

  isSaving: boolean;
  setIsSaving: Dispatch<React.SetStateAction<boolean>>;

  isDeleting: boolean;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;

  newProjectData: Project;
  setNewProjectData: Dispatch<React.SetStateAction<Project>>;

  selectedCategory: string;
  setSelectedCategory: Dispatch<React.SetStateAction<string>>;

  featuredState: boolean;
  setFeaturedState: Dispatch<React.SetStateAction<boolean>>;

  completedState: boolean;
  setCompletedState: Dispatch<React.SetStateAction<boolean>>;
};

export const projectContext = createContext<projectState | null>(null);
