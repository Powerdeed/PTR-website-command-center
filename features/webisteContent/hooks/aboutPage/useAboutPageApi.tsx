"use client";

import { useContext } from "react";

import { aboutUs } from "../../services/aboutpage";
import { companyStructure } from "../../services/companyStructure";

import { aboutpageContext } from "../../context/aboutpageContext";

export default function useAboutPageApi() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const { setAboutOverviewData, setCompanyStructureData } = aboutpageState;
  const resetChanges = () => {
    setAboutOverviewData(aboutUs);
    setCompanyStructureData(companyStructure);
  };

  const saveAllChanges = () => {};

  return { resetChanges, saveAllChanges };
}
