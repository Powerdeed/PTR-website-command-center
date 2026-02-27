"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AboutUs, aboutUs } from "@/services/aboutpage";

// component styling
import { DraftifyDocument } from "draftify";
import DraftifyReact, { DraftifyBlock } from "draftify-react";
import "draftify-react/styles.css";
import { ButtonLight } from "@/components/ui/Button";
import { SubTitle } from "@/components/ui/Title";

export default function AboutPage() {
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
  ) =>
    setAboutOverviewData((prev) => {
      const dataToUpdate = prev.find((data) => data.title === dataTitle);
      const otherData = prev.filter((data) => data.title !== dataTitle);

      if (!dataToUpdate) {
        return otherData;
      }

      if (dataTitle !== "Why Choose Powerdeed?") {
        return [
          ...otherData,
          {
            title: dataToUpdate.title,
            description: data,
          },
        ];
      } else {
        if (Array.isArray(dataToUpdate.description) && index !== undefined) {
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
      }
    });

  useEffect(() => {
    const updateData = () =>
      updateAboutOverviewData(
        aboutOverviewSummaryDoc.blocks,
        "Company Overview",
      );

    updateData();
  }, [aboutOverviewSummaryDoc]);

  const handleAddWhyChooseItems = () =>
    setAboutOverviewData((prev) => {
      const whyChooseItems = prev.find(
        (item) => item.title === "Why Choose Powerdeed?",
      )?.description as string[];

      whyChooseItems.push("");

      const otherData = prev.filter(
        (data) => data.title !== "Why Choose Powerdeed?",
      );

      return [
        ...otherData,
        {
          title: "Why Choose Powerdeed?",
          description: whyChooseItems,
        },
      ];
    });

  return (
    <div>
      {/* OVERVIEW SUBSECTION */}
      <div className="vertical-layout__outer">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Overview Subsection" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          Overview Summary
          <DraftifyReact
            draftifyDoc={aboutOverviewSummaryDoc}
            setDoc={setAboutOverviewSummaryDoc}
            options={["paragraph"]}
          />
        </div>

        <div className="vertical-layout__inner">
          Mission Statement
          <input
            type="text"
            className="input-style"
            value={
              aboutOverviewData.find((about) => about.title === "Mission")
                ?.description as string
            }
            onChange={(e) => updateAboutOverviewData(e.target.value, "Mission")}
          />
        </div>

        <div className="vertical-layout__inner">
          Vision Statement
          <input
            type="text"
            className="input-style input-focus"
            value={
              aboutOverviewData.find((about) => about.title === "Vision")
                ?.description as string
            }
            onChange={(e) => updateAboutOverviewData(e.target.value, "Vision")}
          />
        </div>

        <SeparatorLine />

        <div className="vertical-layout__inner">
          <div className="flex gap-2.5">
            <div className="flex-1">Why Choose Us</div>
            <div onClick={handleAddWhyChooseItems}>
              <ButtonLight buttonText="+ Add Item" />
            </div>
          </div>

          <div className="vertical-layout__inner">
            {Array.isArray(
              aboutOverviewData.find(
                (data) => data.title === "Why Choose Powerdeed?",
              )?.description,
            ) &&
              (
                aboutOverviewData.find(
                  (data) => data.title === "Why Choose Powerdeed?",
                )?.description as string[]
              ).map((reason: string, index: number) => (
                <div key={index} className="flex gap-2.5 p-2.5 items-center">
                  <input
                    type="text"
                    className="flex-1 w-full outline-none input-style"
                    value={reason}
                    onChange={(e) =>
                      updateAboutOverviewData(
                        e.target.value,
                        "Why Choose Powerdeed?",
                        index,
                      )
                    }
                  />

                  <div className="text-(--primary-red) cursor-pointer">
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
