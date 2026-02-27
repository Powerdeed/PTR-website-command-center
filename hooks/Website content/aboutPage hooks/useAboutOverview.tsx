"use client";

import { aboutUs, AboutUs } from "@/services/aboutpage";
import { DraftifyBlock, DraftifyDocument } from "draftify";
import { useEffect, useState } from "react";

export default function useAboutOverview() {
  const [aboutOverviewData, setAboutOverviewData] =
    useState<AboutUs[]>(aboutUs);

  const [aboutOverviewSummaryDoc, setAboutOverviewSummaryDoc] =
    useState<DraftifyDocument>({
      version: "0.0.0",
      metadata: {},
      blocks:
        (aboutOverviewData.find((data) => data.title === "Company Overview")
          ?.description as DraftifyBlock[]) || ([] as DraftifyBlock[]),
    });

  const updateAboutOverviewData = (
    data: AboutUs["description"],
    dataTitle: string,
    index?: number,
    indexOfIndex?: number,
  ) =>
    setAboutOverviewData((prev) => {
      const dataToUpdate = prev.find((data) => data.title === dataTitle);
      const otherData = prev.filter((data) => data.title !== dataTitle);
      const excludedTitles = [
        "Why Choose Powerdeed?",
        "Unique Features",
        "Core Values",
      ];

      if (!dataToUpdate) return prev;

      if (!excludedTitles.includes(dataTitle)) {
        return [
          ...otherData,
          {
            title: dataToUpdate.title,
            description: data,
          },
        ];
      } else if (
        dataTitle === "Why Choose Powerdeed?" ||
        dataTitle === "Unique Features"
      ) {
        if (index !== undefined) {
          const updatedArray = [...(dataToUpdate.description as string[])];
          updatedArray[index] = data as string;
          return [
            ...otherData,
            {
              title: dataToUpdate.title,
              description: updatedArray,
            },
          ];
        }
        return prev;
      } else if (dataTitle === "Core Values") {
        if (indexOfIndex !== undefined && index !== undefined) {
          const updatedArray = [...(dataToUpdate.description as string[][])];
          updatedArray[index][indexOfIndex] = data as string;

          return [
            ...otherData,
            {
              title: dataToUpdate.title,
              description: updatedArray,
            },
          ];
        }
        return prev;
      }
      return prev;
    });

  useEffect(() => {
    const updateData = () =>
      updateAboutOverviewData(
        aboutOverviewSummaryDoc.blocks,
        "Company Overview",
      );

    updateData();
  }, [aboutOverviewSummaryDoc]);

  const handleAddItems = (title: string) =>
    setAboutOverviewData((prev) => {
      const targetData = prev.find((item) => item.title === title)
        ?.description as string[] | string[][];

      const otherData = prev.filter((data) => data.title !== title);

      if (title !== "Core Values") {
        return [
          ...otherData,
          {
            title: title,
            description: [...targetData, ""],
          } as AboutUs,
        ];
      } else {
        return [
          ...otherData,
          {
            title: title,
            description: [...targetData, ["", ""]],
          } as AboutUs,
        ];
      }
    });

  const handleDeleteItems = (title: string, index: number) =>
    setAboutOverviewData((prev) => {
      const whyChooseItems = prev.find((item) => item.title === title)
        ?.description as string[];

      const whyChooseItemsUpdated = whyChooseItems.toSpliced(index, 1);

      const otherData = prev.filter((data) => data.title !== title);

      return [
        ...otherData,
        {
          title: title,
          description: whyChooseItemsUpdated,
        },
      ];
    });

  return {
    aboutOverviewData,
    aboutOverviewSummaryDoc,
    setAboutOverviewSummaryDoc,
    updateAboutOverviewData,
    handleAddItems,
    handleDeleteItems,
  };
}
