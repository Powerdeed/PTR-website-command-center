"use client";

import { useContext } from "react";

import { aboutpageContext } from "../../context/aboutpage/aboutpageContext";
import { companyStructureContext } from "../../context/aboutpage/companyStructureContext";

export default function useAboutpageState() {
  const aboutpageState = useContext(aboutpageContext);
  const companyStructureState = useContext(companyStructureContext);

  if (!aboutpageState || !companyStructureState)
    throw new Error("Context must be within a provider");

  return {
    ...aboutpageState,
    ...companyStructureState,
  };
}
