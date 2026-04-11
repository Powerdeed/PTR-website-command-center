"use client";

import { useContext, useEffect } from "react";

import { companyStructureContext } from "../../context/aboutpage/companyStructureContext";

import {
  getCompanyStructureData,
  updateCompanyStructureData,
} from "../../services/companyStructure";

import { ApiError } from "@lib/api/utils/apiError";
import { execute } from "@lib/api/execute";

export default function useCompanyStructureApi() {
  const companyStructureState = useContext(companyStructureContext);

  if (!companyStructureState)
    throw new Error("Context must be within a provider");

  const {
    companyStructure,
    setCompanyStructure,
    setCompanyStructurePrev,
    companyStructureId,
    setCompanyStructureId,
    setLoadingCompanyStructureError,
    setUpdatingCompanyStructure,
    setUpdatingCompanyStructureError,
    setHasCompanyStructureChanged,
    refreshCompanyStructure,
  } = companyStructureState;

  useEffect(() => {
    const fetchCompanyStructure = async () => {
      try {
        const companyStructureData = await getCompanyStructureData();

        setCompanyStructure(companyStructureData[0].structure);
        setCompanyStructurePrev(companyStructureData[0].structure);
        setCompanyStructureId(companyStructureData[0]._id);
      } catch (error) {
        if (error instanceof ApiError)
          setLoadingCompanyStructureError(error.message);
      }
    };

    fetchCompanyStructure();
  }, [
    refreshCompanyStructure,
    setCompanyStructure,
    setCompanyStructureId,
    setCompanyStructurePrev,
    setLoadingCompanyStructureError,
  ]);

  const handlesaveCompanyStructure = async () => {
    if (!companyStructure) return;

    await execute(
      () => updateCompanyStructureData(companyStructureId, companyStructure),
      {
        setLoading: setUpdatingCompanyStructure,
        setError: setUpdatingCompanyStructureError,
        onSuccess: (updatedStructure) => {
          setCompanyStructure(updatedStructure);
          setCompanyStructurePrev(updatedStructure);
          setHasCompanyStructureChanged(false);
        },
      },
    );
  };

  return {
    handlesaveCompanyStructure,
  };
}
