"use client";

import { useContext, useEffect } from "react";

import { companyStructureContext } from "../../context/aboutpage/companyStructureContext";

import {
  getCompanyStructureData,
  updateCompanyStructureData,
} from "../../services/companyStructure";

import { execute } from "@lib/api/execute";

export default function useCompanyStructureApi() {
  const companyStructureState = useContext(companyStructureContext);

  if (!companyStructureState)
    throw new Error("Context must be within a provider");

  const {
    companyStructure,
    setCompanyStructure,
    setCompanyStructurePrev,
    setLoadingCompanyStructure,
    setLoadingCompanyStructureError,
    setUpdatingCompanyStructure,
    setUpdatingCompanyStructureError,
    setHasCompanyStructureChanged,
    refreshCompanyStructure,
  } = companyStructureState;

  useEffect(() => {
    const fetchCompanyStructure = async () =>
      execute(getCompanyStructureData, {
        setLoading: setLoadingCompanyStructure,
        setError: setLoadingCompanyStructureError,
        onSuccess: (companyStructureData) => {
          setCompanyStructure(companyStructureData.structure);
          setCompanyStructurePrev(companyStructureData.structure);
          setHasCompanyStructureChanged(false);
        },
      });

    fetchCompanyStructure();
  }, [
    refreshCompanyStructure,
    setCompanyStructure,
    setCompanyStructurePrev,
    setHasCompanyStructureChanged,
    setLoadingCompanyStructure,
    setLoadingCompanyStructureError,
  ]);

  const handlesaveCompanyStructure = async () => {
    if (!companyStructure) return;

    await execute(() => updateCompanyStructureData(companyStructure), {
      setLoading: setUpdatingCompanyStructure,
      setError: setUpdatingCompanyStructureError,
      onSuccess: (updatedStructure) => {
        setCompanyStructure(updatedStructure.structure);
        setCompanyStructurePrev(updatedStructure.structure);
        setHasCompanyStructureChanged(false);
      },
    });
  };

  return {
    handlesaveCompanyStructure,
  };
}
