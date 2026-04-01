"use client";

import { useContext } from "react";
import { projectContext } from "../context/projectsContext";

export default function useProjectsState() {
  const pContext = useContext(projectContext);

  if (!pContext) throw new Error("projects context must be within a provider");

  return { ...pContext };
}
