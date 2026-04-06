"use client";

import { useContext, useEffect } from "react";

import { projectContext } from "../context/projectsContext";

import { Project } from "../types/projects.types";

export default function useProjectsEdit() {
  const pContext = useContext(projectContext);

  if (!pContext) throw new Error("projects context must be within a provider");

  const {
    setSelectedProject,
    setSelectedProjectId,
    setisNewProject,
    featuredState,
    setFeaturedState,
    completedState,
    setCompletedState,
  } = pContext;

  const handleSelectedProject = (p: Project) => {
    setisNewProject(false);
    setSelectedProject(p);
    setSelectedProjectId(p._id || "");
    setFeaturedState(p.featured);
    setCompletedState(p.status === "Completed" ? true : false);
  };

  const updateByPath = (
    path: Array<keyof Project | number>,
    value: boolean | string | Record<string, string>,
  ) =>
    setSelectedProject((prev) => {
      if (!prev) return prev;

      const clone: Project = structuredClone(prev);

      let current: unknown = clone;

      for (let i = 0; i < path.length - 1; i++) {
        current = (
          current as Record<string | number, string | Record<string, string>>
        )[path[i] as string];
      }

      (
        current as Record<
          string | number,
          boolean | string | Record<string, string>
        >
      )[path[path.length - 1] as string] = value;

      return clone;
    });

  useEffect(() => {
    const handleFeaturedProject = () =>
      setSelectedProject((proj) =>
        proj
          ? {
              ...proj,
              featured: featuredState,
              status: completedState ? "Completed" : "Ongoing",
            }
          : proj,
      );

    handleFeaturedProject();
  }, [featuredState, completedState, setSelectedProject]);

  return {
    updateByPath,
    handleSelectedProject,
  };
}
