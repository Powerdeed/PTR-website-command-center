"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// component styling
import DraftifyReact from "draftify-react";
import "draftify-react/styles.css";
import { ButtonLight } from "@components/ui/Button";
import { SubTitle } from "@components/ui/Title";

// hooks
import useAboutOverview from "@hooks/Website content/aboutPage hooks/useAboutOverview";
import useCompanyStructure from "@hooks/Website content/aboutPage hooks/useCompanyStructure";

export default function AboutPage() {
  const {
    aboutOverviewData,
    aboutOverviewSummaryDoc,
    setAboutOverviewSummaryDoc,
    updateAboutOverviewData,
    handleAddItems,
    handleDeleteItems,
  } = useAboutOverview();

  const { companyStructure } = useCompanyStructure();

  return (
    <div className="vertical-layout__outer">
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
            <div onClick={() => handleAddItems("Why Choose Powerdeed?")}>
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

                  <div
                    className="text-(--primary-red) cursor-pointer"
                    onClick={() =>
                      handleDeleteItems("Why Choose Powerdeed?", index)
                    }
                  >
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              ))}
          </div>

          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          <div className="flex gap-2.5">
            <div className="flex-1">Unique features & benefits</div>
            <div onClick={() => handleAddItems("Unique Features")}>
              <ButtonLight buttonText="+ Add Item" />
            </div>
          </div>

          <div className="vertical-layout__inner">
            {Array.isArray(
              aboutOverviewData.find((data) => data.title === "Unique Features")
                ?.description,
            ) &&
              (
                aboutOverviewData.find(
                  (data) => data.title === "Unique Features",
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
                        "Unique Features",
                        index,
                      )
                    }
                  />

                  <div
                    className="text-(--primary-red) cursor-pointer"
                    onClick={() => handleDeleteItems("Unique Features", index)}
                  >
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              ))}
          </div>

          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          <div className="flex gap-2.5">
            <div className="flex-1">Core Values</div>
            <div onClick={() => handleAddItems("Core Values")}>
              <ButtonLight buttonText="+ Add Item" />
            </div>
          </div>

          <div className="vertical-layout__inner">
            {Array.isArray(
              aboutOverviewData.find((data) => data.title === "Core Values")
                ?.description,
            ) &&
              (
                aboutOverviewData.find((data) => data.title === "Core Values")
                  ?.description as string[]
              ).map((reason: string, index: number) => (
                <div key={index} className="flex gap-2.5 p-2.5 items-center">
                  <input
                    type="text"
                    className="flex-1 w-full outline-none input-style"
                    value={reason[0]}
                    onChange={(e) =>
                      updateAboutOverviewData(
                        e.target.value,
                        "Core Values",
                        index,
                        0,
                      )
                    }
                  />

                  <input
                    type="text"
                    className="flex-1 w-full outline-none input-style"
                    value={reason[1]}
                    onChange={(e) =>
                      updateAboutOverviewData(
                        e.target.value,
                        "Core Values",
                        index,
                        1,
                      )
                    }
                  />

                  <div
                    className="text-(--primary-red) cursor-pointer"
                    onClick={() => handleDeleteItems("Core Values", index)}
                  >
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              ))}
          </div>

          <SeparatorLine />
        </div>
      </div>

      {/* STRUCTURE SUBSECTION */}
      <div className="vertical-layout__outer">
        <div className="flex gap-2.5 items-center">
          <div className="vertical-layout__inner flex-1">
            <SubTitle subtitle="Overview Subsection" />
            <div className="text-style__small-text text-(--terciary-grey)">
              Company hierarchy and organizational structure
            </div>
          </div>

          <div>
            <ButtonLight buttonText="+ Add Level" />
          </div>
        </div>

        {companyStructure.map((level) => (
          <div
            key={level.id}
            className="container-layout vertical-layout__inner"
          >
            <div className="flex gap-2.5 items-center">
              <div className="font-semibold flex-1">Level {level.id}</div>

              <div className="text-(--primary-red)">
                <FontAwesomeIcon icon={["far", "trash-can"]} />
              </div>
            </div>

            <div className="vertical-layout__inner">
              <div className="text-style__small-text">Level Name</div>
              <input
                type="text"
                className="input-style"
                value={level.levelName}
                onChange={() => {}}
              />
            </div>

            <div className="vertical-layout__inner">
              <div className="flex gap-2.5 items-center">
                <div className="text-style__small-text flex-1">Positions</div>
                <ButtonLight buttonText="+ Add Position" />
              </div>

              {level.positions.map((position, index) => (
                <div key={index} className="flex gap-2.5 items-center">
                  <input
                    type="text"
                    className="input-style flex-1"
                    value={position}
                    onChange={() => {}}
                  />

                  <div className="text-(--primary-red)">
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
