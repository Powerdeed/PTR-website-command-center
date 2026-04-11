"use client";

import { useState } from "react";

import { companyStructureContext } from "./companyStructureContext";

import { CompanyStructure } from "../../types/aboutPage.types";

export default function CompanyStructureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyStructure, setCompanyStructure] = useState<
    CompanyStructure[] | null
  >(null);

  const [companyStructurePrev, setCompanyStructurePrev] = useState<
    CompanyStructure[] | null
  >(null);

  const [companyStructureId, setCompanyStructureId] = useState("");

  const [loadingCompanyStructure, setLoadingCompanyStructure] = useState(false);

  const [loadingCompanyStructureError, setLoadingCompanyStructureError] =
    useState("");

  const [updatingCompanyStructure, setUpdatingCompanyStructure] =
    useState(false);

  const [updatingCompanyStructureError, setUpdatingCompanyStructureError] =
    useState("");

  const [hasCompanyStructureChanged, setHasCompanyStructureChanged] =
    useState(false);

  const [refreshCompanyStructure, setRefreshCompanyStructure] = useState(false);

  return (
    <companyStructureContext.Provider
      value={{
        companyStructure,
        setCompanyStructure,
        companyStructurePrev,
        setCompanyStructurePrev,
        companyStructureId,
        setCompanyStructureId,
        loadingCompanyStructure,
        setLoadingCompanyStructure,
        loadingCompanyStructureError,
        setLoadingCompanyStructureError,
        updatingCompanyStructure,
        setUpdatingCompanyStructure,
        updatingCompanyStructureError,
        setUpdatingCompanyStructureError,
        hasCompanyStructureChanged,
        setHasCompanyStructureChanged,
        refreshCompanyStructure,
        setRefreshCompanyStructure,
      }}
    >
      {children}
    </companyStructureContext.Provider>
  );
}
