"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { sortBasedOnId } from "../../utils/conversions";

import { companyStructureContext } from "../../context/aboutpage/companyStructureContext";

import { CompanyStructure } from "../../types/aboutPage.types";

export default function useCompanyStructureEditor() {
  const companyStructureState = useContext(companyStructureContext);

  if (!companyStructureState)
    throw new Error("Context must be within a provider");

  const {
    companyStructure,
    companyStructurePrev,
    setCompanyStructure,
    setHasCompanyStructureChanged,
  } = companyStructureState;

  const updateStructure = (
    levelId: string,
    levelName: string,
    positionId?: number,
    positionData?: string,
  ) => {
    setCompanyStructure((prev) => {
      if (!prev || !companyStructurePrev) return prev;

      const dataObjToUpdate = prev.find((data) => data.id === levelId);
      if (!dataObjToUpdate) return prev;

      const otherData = prev.filter((data) => data.id !== levelId);

      let sorted: CompanyStructure[];

      // If positionId and positionData are provided, update the specific position
      if (positionId !== undefined && positionData !== undefined) {
        const positionsData = [...dataObjToUpdate.positions];
        positionsData[positionId] = positionData;

        const updatedObj = {
          ...dataObjToUpdate,
          levelName,
          positions: positionsData,
        };

        sorted = sortBasedOnId([...otherData, updatedObj]);

        setHasCompanyStructureChanged(!isEqual(companyStructurePrev, sorted));

        return sorted;
      }

      // Otherwise, just update the level name
      const updatedObj = { ...dataObjToUpdate, levelName };
      
      sorted = sortBasedOnId([...otherData, updatedObj]);

      setHasCompanyStructureChanged(!isEqual(companyStructurePrev, sorted));

      return sorted;
    });
  };

  const addHierarchyLevel = () =>
    setCompanyStructure((prev) => {
      if (!prev || !companyStructure) return prev;

      return [
        ...prev,
        {
          id: (companyStructure.length + 1).toString(),
          levelName: "",
          positions: [""],
        } as CompanyStructure,
      ];
    });

  const deleteHierarchyLevel = (index: string) =>
    setCompanyStructure((prev) => {
      if (!prev) return prev;

      return prev.filter((levelData) => levelData.id !== index);
    });

  const addLevelPosition = (index: string) =>
    setCompanyStructure((prev) => {
      if (!prev) return prev;

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
    setCompanyStructure((prev) => {
      if (!prev) return prev;
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
    updateStructure,
    addHierarchyLevel,
    deleteHierarchyLevel,
    addLevelPosition,
    deleteLevelPosition,
  };
}
