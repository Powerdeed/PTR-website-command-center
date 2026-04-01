"use client";

import { useState } from "react";
import { projectContext } from "./projectsContext";
import { formattedProjectData } from "../services/projects";
import { Project } from "../types/projects.types";
import { EMPTY_PROJECT } from "../constants/emptyProject";

export default function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projectsObj, setProjectsObj] = useState<Record<string, Project[]>>(
    formattedProjectData(),
  );
  const [selectedProject, setSelectedProject] = useState(
    projectsObj["Electrical Installation"][0] || null,
  );
  const [isAddingNewProject, setisAddingNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newProjectData, setNewProjectData] = useState<Project>(EMPTY_PROJECT);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Electrical Installation",
  );
  const [featuredState, setFeaturedState] = useState(selectedProject.featured);
  const [completedState, setCompletedState] = useState(false);

  return (
    <projectContext.Provider
      value={{
        projectsObj,
        setProjectsObj,
        selectedProject,
        setSelectedProject,
        isAddingNewProject,
        setisAddingNewProject,
        isSaving,
        setIsSaving,
        isDeleting,
        setIsDeleting,
        newProjectData,
        setNewProjectData,
        selectedCategory,
        setSelectedCategory,
        featuredState,
        setFeaturedState,
        completedState,
        setCompletedState,
      }}
    >
      {children}
    </projectContext.Provider>
  );
}
