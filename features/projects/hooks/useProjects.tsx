"use client";

import useProjectsState from "./useProjectsState";
import useProjectsHandlers from "./useProjectsHandlers";
import useProjectImage from "./useProjectImage";

export default function useProjects() {
  const state = useProjectsState();
  const projectHandlers = useProjectsHandlers();
  const imageHandlers = useProjectImage();

  return {
    state,
    actions: { ...projectHandlers, ...imageHandlers },
  };
}
