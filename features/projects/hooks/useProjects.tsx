"use client";

import { useEffect, useState } from "react";

import { formattedProjectData } from "@features/projects/services/projects";
import { Project } from "../types/projects.types";

const emptyProject: Project = {
  id: crypto.randomUUID(),
  category: "",
  name: "",
  description: "",
  images: [""],
  status: "Ongoing",
  featured: false,
};

export default function useProjects() {
  const [projectsObj, setProjectsObj] = useState<Record<string, Project[]>>(
    formattedProjectData(),
  );
  const [selectedProject, setSelectedProject] = useState(
    projectsObj["Electrical Installation"][0] || null,
  );
  const [isAddingNewProject, setisAddingNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newProjectData, setNewProjectData] = useState<Project>(emptyProject);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Electrical Installation",
  );
  const [featuredState, setFeaturedState] = useState(selectedProject.featured);
  const [completedState, setCompletedState] = useState(false);

  const handleSelectedProject = (p: Project) => {
    setSelectedProject(p || emptyProject);

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

      setNewProjectData(emptyProject);

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
      setNewProjectData(emptyProject);
    } else if (selectedProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[selectedCategory];

        const updatedProjects = currentProjectsFromCategory.filter(
          (project) => project.id !== selectedProject.id,
        );

        return { ...prev, [selectedCategory]: updatedProjects };
      });
      setSelectedProject(emptyProject);
    }
    setIsDeleting(false);
  };

  const handleImageUpload = () => {};

  return {
    projectsObj,
    newProjectData,
    setNewProjectData,
    handleAddNewProject,
    selectedCategory,
    setSelectedCategory,
    selectedProject,
    setSelectedProject,
    handleSelectedProject,
    emptyProject,
    isAddingNewProject,
    featuredState,
    setFeaturedState,
    completedState,
    setCompletedState,
    handleImageUpload,
    handleSaveChanges,
    handleDeleteProject,
    isSaving,
    isDeleting,
  };
}
