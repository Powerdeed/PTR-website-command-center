"use client";

import { useState } from "react";
import { aboutpageContext } from "./aboutpageContext";
import { aboutUs, AboutUs } from "../services/aboutpage";
import { DraftifyBlock, DraftifyDocument } from "draftify";
import {
  companyStructure,
  CompanyStructure,
} from "../services/companyStructure";

export default function AboutpageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aboutOverviewData, setAboutOverviewData] =
    useState<AboutUs[]>(aboutUs);

  const [aboutOverviewSummaryDoc, setAboutOverviewSummaryDoc] =
    useState<DraftifyDocument>({
      version: "0.0.0",
      metadata: {},
      blocks:
        (aboutOverviewData.find((data) => data.title === "Company Overview")
          ?.description as DraftifyBlock[]) || ([] as DraftifyBlock[]),
    });

  const [companyStructureData, setCompanyStructureData] =
    useState<CompanyStructure[]>(companyStructure);

  return (
    <aboutpageContext.Provider
      value={{
        aboutOverviewData,
        setAboutOverviewData,
        aboutOverviewSummaryDoc,
        setAboutOverviewSummaryDoc,
        companyStructureData,
        setCompanyStructureData,
      }}
    >
      {children}
    </aboutpageContext.Provider>
  );
}
