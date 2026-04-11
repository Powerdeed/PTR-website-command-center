"use client";

import { createContext, Dispatch } from "react";

import { CompanyStructure } from "../../types/aboutPage.types";

type CompanyStructureState = {
  companyStructure: CompanyStructure[] | null;
  setCompanyStructure: Dispatch<
    React.SetStateAction<CompanyStructure[] | null>
  >;

  companyStructurePrev: CompanyStructure[] | null;
  setCompanyStructurePrev: Dispatch<
    React.SetStateAction<CompanyStructure[] | null>
  >;

  companyStructureId: string;
  setCompanyStructureId: Dispatch<React.SetStateAction<string>>;

  loadingCompanyStructure: boolean;
  setLoadingCompanyStructure: Dispatch<React.SetStateAction<boolean>>;

  loadingCompanyStructureError: string;
  setLoadingCompanyStructureError: Dispatch<React.SetStateAction<string>>;

  updatingCompanyStructure: boolean;
  setUpdatingCompanyStructure: Dispatch<React.SetStateAction<boolean>>;

  updatingCompanyStructureError: string;
  setUpdatingCompanyStructureError: Dispatch<React.SetStateAction<string>>;

  hasCompanyStructureChanged: boolean;
  setHasCompanyStructureChanged: Dispatch<React.SetStateAction<boolean>>;

  refreshCompanyStructure: boolean;
  setRefreshCompanyStructure: Dispatch<React.SetStateAction<boolean>>;
};

export const companyStructureContext =
  createContext<CompanyStructureState | null>(null);
