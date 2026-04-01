"use client";

import { createContext, Dispatch } from "react";
import { AboutUs } from "../services/aboutpage";
import { DraftifyDocument } from "draftify";
import { CompanyStructure } from "../services/companyStructure";

type AboutpageState = {
  aboutOverviewData: AboutUs[];
  setAboutOverviewData: Dispatch<React.SetStateAction<AboutUs[]>>;

  aboutOverviewSummaryDoc: DraftifyDocument;
  setAboutOverviewSummaryDoc: Dispatch<React.SetStateAction<DraftifyDocument>>;

  companyStructureData: CompanyStructure[];
  setCompanyStructureData: Dispatch<React.SetStateAction<CompanyStructure[]>>;
};

export const aboutpageContext = createContext<AboutpageState | null>(null);
