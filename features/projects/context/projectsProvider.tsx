"use client";

import { useState } from "react";

import { projectContext } from "./projectsContext";

import { CategorizedProjects, Project } from "../types/projects.types";

export default function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<CategorizedProjects | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [selectedProjectPrev, setSelectedProjectPrev] =
    useState<Project | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Electrical Installation",
  );

  const [featuredState, setFeaturedState] = useState(false);

  const [completedState, setCompletedState] = useState(false);

  const [isNewProject, setisNewProject] = useState(false);

  const [getProjectsError, setGetProjectsError] = useState("");

  const [error, setError] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [refreshProjects, setRefreshProjects] = useState(false);

  const [hasProjectChanged, setHasProjectChanged] = useState(false);

  return (
    <projectContext.Provider
      value={{
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        selectedProjectPrev,
        setSelectedProjectPrev,
        isNewProject,
        setisNewProject,
        error,
        setError,
        getProjectsError,
        setGetProjectsError,
        isUploading,
        setIsUploading,
        isDeleting,
        setIsDeleting,
        selectedCategory,
        setSelectedCategory,
        featuredState,
        setFeaturedState,
        completedState,
        setCompletedState,
        refreshProjects,
        setRefreshProjects,
        hasProjectChanged,
        setHasProjectChanged,
      }}
    >
      {children}
    </projectContext.Provider>
  );
}
