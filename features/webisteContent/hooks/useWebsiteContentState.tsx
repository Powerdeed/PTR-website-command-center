"use client";

import { useContext } from "react";

import { websiteContentContext } from "../context/websiteContentContext";

export default function useWebsiteContentState() {
  const wContextState = useContext(websiteContentContext);

  if (!wContextState) throw new Error("Context must be within a provider");

  return {
    ...wContextState,
  };
}
