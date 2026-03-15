"use client";

import {
  CompanyStructure,
  companyStructure,
} from "../../services/companyStructure";

import { sortBasedOnId } from "../../utils/conversions";
import { useState } from "react";

export default function useCompanyStructure() {
  const [companyStructureData, setCompanyStructureData] =
    useState<CompanyStructure[]>(companyStructure);

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
    companyStructure,
    companyStructureData,
    setCompanyStructureData,
    updateStructure,
    addHierarchyLevel,
    deleteHierarchyLevel,
    addLevelPosition,
    deleteLevelPosition,
  };
}
