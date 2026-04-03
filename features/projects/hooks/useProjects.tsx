"use client";

import useProjectsState from "./useProjectsState";
import useProjectsHandlers from "./useProjectsHandlers";
import useProjectImage from "./useProjectImage";
import useProjectsApi from "./useProjectsApi";

export default function useProjects() {
  const state = useProjectsState();
  const projectHandlers = useProjectsHandlers();
  const imageHandlers = useProjectImage();
  const api = useProjectsApi();

  return {
    state,
    actions: { ...projectHandlers, ...imageHandlers, ...api },
  };
}
