"use client";

import { useContext } from "react";

import { aboutUs } from "@features/webisteContent/services/aboutpage";
import { companyStructure } from "@features/webisteContent/services/companyStructure";

import { aboutpageContext } from "@features/webisteContent/context/aboutpageContext";

import useAboutOverview from "./useAboutOverview";
import useCompanyStructure from "./useCompanyStructure";

export default function useAboutPage() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const { setAboutOverviewData, setCompanyStructureData } = aboutpageState;

  const aboutOverviewHandlers = useAboutOverview();
  const companyStructureHandlers = useCompanyStructure();

  const resetChanges = () => {
    setAboutOverviewData(aboutUs);
    setCompanyStructureData(companyStructure);
  };

  const saveAllChanges = () => {};

  return {
    ...aboutOverviewHandlers,
    ...companyStructureHandlers,
    resetChanges,
    saveAllChanges,
  };
}
