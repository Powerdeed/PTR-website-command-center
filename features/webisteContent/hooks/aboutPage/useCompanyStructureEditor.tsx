"use client";

import { aboutpageContext } from "@features/webisteContent/context/aboutpageContext";
import { CompanyStructure } from "../../services/companyStructure";

import { sortBasedOnId } from "../../utils/conversions";
import { useContext } from "react";

export default function useCompanyStructureEditor() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const { companyStructureData, setCompanyStructureData } = aboutpageState;

  const addHierarchyLevel = () =>
    setCompanyStructureData((prev) => {
      return [
        ...prev,
        {
          id: (companyStructureData.length + 1).toString(),
          levelName: "",
          positions: [""],
        } as CompanyStructure,
      ];
    });

  const deleteHierarchyLevel = (index: string) =>
    setCompanyStructureData((prev) =>
      prev.filter((levelData) => levelData.id !== index),
    );

  const addLevelPosition = (index: string) =>
    setCompanyStructureData((prev) => {
      const otherData = prev.filter((data) => data.id !== index);
      const targetObj = prev.find((levelData) => levelData.id === index);

      if (targetObj)
        return sortBasedOnId([
          ...otherData,
          {
            ...targetObj,
            positions: [...targetObj.positions, ""],
          } as CompanyStructure,
        ]);

      return prev;
    });

  const deleteLevelPosition = (levelIndex: string, index: number) =>
    setCompanyStructureData((prev) => {
      const otherData = prev.filter((data) => data.id !== levelIndex);
      const targetObj = prev.find((levelData) => levelData.id === levelIndex);
      const filteredtargetObjPositions = targetObj?.positions.toSpliced(
        index,
        1,
      );

      if (targetObj && filteredtargetObjPositions)
        return sortBasedOnId([
          ...otherData,
          {
            ...targetObj,
            positions: filteredtargetObjPositions,
          },
        ]);

      return prev;
    });

  return {
    addHierarchyLevel,
    deleteHierarchyLevel,
    addLevelPosition,
    deleteLevelPosition,
  };
}
