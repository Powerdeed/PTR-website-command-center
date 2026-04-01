"use client";

import { useContext, useEffect } from "react";
import { projectContext } from "../context/projectsContext";
import { Project } from "../types/projects.types";
import { EMPTY_PROJECT } from "../constants/emptyProject";

export default function useProjectsHandlers() {
  const pContext = useContext(projectContext);

  if (!pContext) throw new Error("projects context must be within a provider");

  const {
    selectedProject,
    setSelectedProject,
    setisAddingNewProject,
    setFeaturedState,
    setCompletedState,
    isAddingNewProject,
    setNewProjectData,
    featuredState,
    completedState,
    setIsDeleting,
    setIsSaving,
    setProjectsObj,
    newProjectData,
    selectedCategory,
  } = pContext;

  const handleSelectedProject = (p: Project) => {
    setSelectedProject(p || EMPTY_PROJECT);

    if (selectedProject) {
      setFeaturedState(p.featured);
      setCompletedState(p.status === "Completed" ? true : false);
    }
  };

  const handleAddNewProject = () => {
    setisAddingNewProject(true);
    setFeaturedState(false);
    setCompletedState(false);
  };

  useEffect(() => {
    const handleFeaturedProject = () => {
      if (isAddingNewProject) {
        setNewProjectData((prev) => ({
          ...prev,
          featured: featuredState,
          status: completedState ? "Completed" : "Ongoing",
        }));
      } else {
        setSelectedProject((proj) => ({
          ...proj,
          featured: featuredState,
          status: completedState ? "Completed" : "Ongoing",
        }));
      }
    };

    handleFeaturedProject();
  }, [featuredState, completedState, isAddingNewProject]);

  const handleSaveChanges = () => {
    setIsSaving(true);

    if (isAddingNewProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[newProjectData.category] || [];

        const updatedProjects: Project[] = [
          ...currentProjectsFromCategory,
          newProjectData,
        ];

        return {
          ...prev,
          [newProjectData.category]: updatedProjects,
        };
      });

      setNewProjectData(EMPTY_PROJECT);

      setisAddingNewProject(false);
    } else if (selectedProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[selectedProject.category];

        const updatedProjects = currentProjectsFromCategory.map((s) =>
          s.id === selectedProject.id ? selectedProject : s,
        );

        return { ...prev, [selectedProject.category]: updatedProjects };
      });
    }

    setIsSaving(false);
  };

  const handleDeleteProject = () => {
    setIsDeleting(true);
    if (isAddingNewProject) {
      setisAddingNewProject(false);
      setNewProjectData(EMPTY_PROJECT);
    } else if (selectedProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[selectedCategory];

        const updatedProjects = currentProjectsFromCategory.filter(
          (project) => project.id !== selectedProject.id,
        );

        return { ...prev, [selectedCategory]: updatedProjects };
      });
      setSelectedProject(EMPTY_PROJECT);
    }
    setIsDeleting(false);
  };

  return {
    handleSelectedProject,
    handleAddNewProject,
    handleSaveChanges,
    handleDeleteProject,
  };
}
