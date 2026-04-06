"use client";

import { useContext, useEffect } from "react";

import { projectContext } from "../context/projectsContext";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projects";

import { CategorizedProjects } from "../types/projects.types";

import { execute } from "@lib/api/execute";
import { ApiError } from "@lib/api/utils/apiError";

import { DEFAULT_PROJECT } from "../constants/defaultProject";

export default function useProjectsApi() {
  const statesContext = useContext(projectContext);

  if (!statesContext) throw new Error("context must be within a provider");

  const {
    selectedProject,
    selectedProjectId,
    selectedCategory,
    setProjectsObj,
    setSelectedProject,
    setisNewProject,
    setFeaturedState,
    setCompletedState,
    setGetProjectsError,
    setError,
    setIsUploading,
    setIsDeleting,
    refreshProjects,
    setRefreshProjects,
  } = statesContext;

  useEffect(() => {
    const getAllProjects = async () => {
      setGetProjectsError("");

      try {
        const projects: CategorizedProjects = await getProjects();

        setProjectsObj(projects);
      } catch (error) {
        if (error instanceof ApiError) setGetProjectsError(error.message);
      }
    };

    getAllProjects();
  }, [refreshProjects, setGetProjectsError, setProjectsObj]);

  const resetStates = (reason?: "new") => {
    setSelectedProject(reason === "new" ? DEFAULT_PROJECT : null);
    setisNewProject(reason === "new" ? true : false);
    setFeaturedState(false);
    setCompletedState(false);
  };

  const handleAddNewProject = async () => {
    if (!selectedProject) return;

    await execute(() => createProject(selectedProject), {
      setLoading: setIsUploading,
      setError,
      onSuccess: (newProject) => {
        setProjectsObj((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: [...prev[selectedCategory], newProject],
          };
        });

        resetStates("new");
        setRefreshProjects((prev) => !prev);
      },
    });
  };

  const handleUpdateProject = async () => {
    if (!selectedProject || !selectedProjectId) return;

    await execute(() => updateProject(selectedProjectId, selectedProject), {
      setLoading: setIsUploading,
      setError,
      onSuccess: (updatedProject) => {
        setProjectsObj((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: prev[selectedCategory].map((p) =>
              p._id === selectedProjectId ? updatedProject : p,
            ),
          };
        });
      },
    });

    setRefreshProjects((prev) => !prev);
  };

  const handleDeleteProject = async () => {
    if (!selectedProjectId) return;

    await execute(() => deleteProject(selectedProjectId), {
      setLoading: setIsDeleting,
      setError,
      onSuccess: () => {
        setProjectsObj((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: prev[selectedCategory].filter(
              (p) => p._id !== selectedProjectId,
            ),
          };
        });

        resetStates();
      },
    });

    setRefreshProjects((prev) => !prev);
  };

  return {
    resetStates,
    handleAddNewProject,
    handleUpdateProject,
    handleDeleteProject,
  };
}
