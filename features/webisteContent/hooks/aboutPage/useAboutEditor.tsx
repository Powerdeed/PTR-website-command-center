"use client";

import { useContext, useEffect } from "react";

import { aboutpageContext } from "@features/webisteContent/context/aboutpageContext";

import { aboutUs, AboutUs } from "../../services/aboutpage";

import { DraftifyBlock } from "draftify";

export default function useAboutEditor() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const {
    aboutOverviewData,
    setAboutOverviewData,
    aboutOverviewSummaryDoc,
    setAboutOverviewSummaryDoc,
  } = aboutpageState;

  const updateAboutOverviewData = (
    data: AboutUs["description"],
    dataTitle: string,
    index?: number,
    indexOfIndex?: number,
  ) =>
    setAboutOverviewData((prev) =>
      prev.map((item) => {
        if (item.title !== dataTitle) return item;

        const excludedTitles = [
          "Why Choose Powerdeed?",
          "Unique Features",
          "Core Values",
        ];

        if (!excludedTitles.includes(dataTitle)) {
          return { ...item, description: data };
        }

        if (
          dataTitle === "Why Choose Powerdeed?" ||
          dataTitle === "Unique Features"
        ) {
          if (index === undefined) return item;

          const updatedArray = [...(item.description as string[])];
          updatedArray[index] = data as string;

          return { ...item, description: updatedArray };
        }

        if (dataTitle === "Core Values") {
          if (index === undefined || indexOfIndex === undefined) return item;

          const updatedArray = [...(item.description as string[][])];
          updatedArray[index] = [...updatedArray[index]];
          updatedArray[index][indexOfIndex] = data as string;

          return { ...item, description: updatedArray };
        }

        return item;
      }),
    );

  useEffect(() => {
    const updateData = () =>
      updateAboutOverviewData(
        aboutOverviewSummaryDoc.blocks,
        "Company Overview",
      );

    updateData();
  }, [aboutOverviewSummaryDoc]);

  const handleAddItems = (title: string) =>
    setAboutOverviewData((prev) =>
      prev.map((item) => {
        if (item.title !== title) return item;

        const targetData = item.description as string[] | string[][];

        if (title !== "Core Values") {
          return {
            ...item,
            description: [...(targetData as string[]), ""],
          };
        }

        return {
          ...item,
          description: [...(targetData as string[][]), ["", ""]],
        };
      }),
    );

  const handleDeleteItems = (title: string, index: number) =>
    setAboutOverviewData((prev) =>
      prev.map((item) => {
        if (item.title !== title) return item;

        const items = item.description as string[];

        return {
          ...item,
          description: items.toSpliced(index, 1),
        };
      }),
    );

  function isObjectOrDraftifyArr(
    val: unknown,
  ): val is string | DraftifyBlock[] {
    if (typeof val === "string") return true;

    if (Array.isArray(val)) {
      return (
        val.length > 0 &&
        val.every(
          (item) =>
            typeof item === "object" && item !== null && !Array.isArray(item),
        )
      );
    }

    return false;
  }

  return {
    aboutUs,
    aboutOverviewData,
    setAboutOverviewData,
    aboutOverviewSummaryDoc,
    setAboutOverviewSummaryDoc,
    updateAboutOverviewData,
    handleAddItems,
    handleDeleteItems,
    isObjectOrDraftifyArr,
  };
}
