"use client";

import { aboutpageContext } from "@features/webisteContent/context/aboutpageContext";

import { sortBasedOnId } from "../../utils/conversions";
import { useContext } from "react";

export default function useCompanyStructureApi() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const { setCompanyStructureData } = aboutpageState;

  const updateStructure = (
    levelId: string,
    levelName: string,
    positionId?: number,
    positionData?: string,
  ) => {
    setCompanyStructureData((prev) => {
      const dataObjToUpdate = prev.find((data) => data.id === levelId);
      if (!dataObjToUpdate) return prev;

      const otherData = prev.filter((data) => data.id !== levelId);

      if (positionId !== undefined && positionData !== undefined) {
        const positionsData = [...dataObjToUpdate.positions];
        positionsData[positionId] = positionData;

        const updatedObj = {
          ...dataObjToUpdate,
          levelName,
          positions: positionsData,
        };

        return sortBasedOnId([...otherData, updatedObj]);
      }

      const updatedObj = { ...dataObjToUpdate, levelName };
      return sortBasedOnId([...otherData, updatedObj]);
    });
  };

  return {
    setCompanyStructureData,
    updateStructure,
  };
}
