"use client";

import { useEffect, useState } from "react";
import { SubTitle } from "@/components/ui/Title";
import { aboutUs } from "@/services/aboutpage";
import { DraftifyDocument } from "draftify";
import DraftifyReact, { DraftifyBlock } from "draftify-react";

// component styling
import "draftify-react/styles.css";

export default function AboutPage() {
  const [aboutOverviewData, setAboutOverviewData] = useState(aboutUs);
  const [aboutOverviewSummaryDoc, setAboutOverviewSummaryDoc] =
    useState<DraftifyDocument>({
      version: "0.0.0",
      metadata: {},
      blocks:
        aboutOverviewData.find((data) => data.title === "Company Overview")
          ?.description || ([] as DraftifyBlock[]),
    });

  // useEffect(() => {
  //   const updateAboutOverviewData = () => {
  //     setAboutOverviewData((prev) => {
  //       const companyOverviewDataPrev = prev.find(
  //         (data) => data.title === "Company Overview",
  //       );
  //       const otherData = prev.filter(
  //         (data) => data.title !== "Company Overview",
  //       );

  //       return [
  //         otherData,
  //         {
  //           ...companyOverviewDataPrev,
  //           description: aboutOverviewSummaryDoc.blocks,
  //         },
  //       ];
  //     });
  //   };

  //   updateAboutOverviewData();
  // }, [aboutOverviewSummaryDoc]);

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
      </div>
    </div>
  );
}

function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
