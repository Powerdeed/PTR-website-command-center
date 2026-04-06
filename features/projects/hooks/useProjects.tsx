"use client";

import useProjectsState from "./useProjectsState";
import useProjectsEdit from "./useProjectsEdit";
import useProjectImage from "./useProjectImage";
import useProjectsApi from "./useProjectsApi";

export default function useProjects() {
  const state = useProjectsState();
  const editHandlers = useProjectsEdit();
  const imageHandlers = useProjectImage();
  const api = useProjectsApi();

  return {
    state,
    actions: { ...editHandlers, ...imageHandlers, ...api },
  };
}
