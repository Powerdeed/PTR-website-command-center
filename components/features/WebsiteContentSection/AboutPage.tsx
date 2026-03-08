"use client";

// component styling
import { DraftifyReact } from "draftify-react";
import "draftify-react/styles.css";
import Button, { ButtonLight, DeleteIconBtn } from "@components/ui/Button";

// hooks
import useAboutOverview from "@hooks/Website content/aboutPage hooks/useAboutOverview";
import useCompanyStructure from "@hooks/Website content/aboutPage hooks/useCompanyStructure";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@components/layout/FormWrapper";

export default function AboutPage() {
  const {
    aboutUs,
    aboutOverviewData,
    setAboutOverviewData,
    aboutOverviewSummaryDoc,
    setAboutOverviewSummaryDoc,
    updateAboutOverviewData,
    handleAddItems,
    handleDeleteItems,
  } = useAboutOverview();

  const {
    companyStructure,
    companyStructureData,
    setCompanyStructureData,
    updateStructure,
    addHierarchyLevel,
    deleteHierarchyLevel,
    addLevelPosition,
    deleteLevelPosition,
  } = useCompanyStructure();

  const resetChanges = () => {
    setAboutOverviewData(aboutUs);
    setCompanyStructureData(companyStructure);
  };

  const saveAllChanges = () => {};

  return (
    <div className="vertical-layout__outer">
      {/* OVERVIEW SUBSECTION */}
      <FormWrapper subtitle="Overview Subsection">
        <div className="vertical-layout__inner">
          Overview Summary
          <DraftifyReact
            draftifyDoc={aboutOverviewSummaryDoc}
            setDoc={setAboutOverviewSummaryDoc}
            options={["paragraph"]}
          />
        </div>

        <InputArea
          label="Mission Statement"
          val={
            aboutOverviewData.find((about) => about.title === "Mission")
              ?.description as string
          }
          changeFunc={(val) => updateAboutOverviewData(val, "Mission")}
        />

        <InputArea
          label="Vision Statement"
          val={
            aboutOverviewData.find((about) => about.title === "Vision")
              ?.description as string
          }
          changeFunc={(val) => updateAboutOverviewData(val, "Vision")}
        />

        <SeparatorLine />

        {["Why Choose Powerdeed?", "Unique Features", "Core Values"].map(
          (info, index) => {
            const arrDesc = aboutOverviewData.find(
              (data) => data.title === info,
            );

            if (!arrDesc) return;

            if (!Array.isArray(arrDesc?.description)) return;

            return (
              <FormWrapper
                key={index}
                keyVal={index}
                subtitle={arrDesc.title}
                subtitleChildren={
                  <ButtonLight
                    buttonText="+ Add Item"
                    clickAction={() => handleAddItems(info)}
                  />
                }
              >
                {Array.isArray(arrDesc.description) &&
                  (arrDesc.description as string[]).map(
                    (reason: string, index: number) => (
                      <div
                        key={index}
                        className="flex gap-2.5 p-2.5 items-center"
                      >
                        {!Array.isArray(reason) ? (
                          <InputArea
                            label=""
                            val={reason}
                            changeFunc={(val) =>
                              updateAboutOverviewData(val, arrDesc.title, index)
                            }
                          >
                            <DeleteIconBtn
                              deleteFunc={() =>
                                handleDeleteItems(arrDesc.title, index)
                              }
                            />
                          </InputArea>
                        ) : (
                          <InputArea
                            label=""
                            val={reason[0]}
                            changeFunc={(val) =>
                              updateAboutOverviewData(
                                val,
                                "Core Values",
                                index,
                                0,
                              )
                            }
                          >
                            <InputArea
                              label=""
                              val={reason[1]}
                              changeFunc={(val) =>
                                updateAboutOverviewData(
                                  val,
                                  "Core Values",
                                  index,
                                  1,
                                )
                              }
                            />

                            <DeleteIconBtn
                              deleteFunc={() =>
                                handleDeleteItems("Core Values", index)
                              }
                            />
                          </InputArea>
                        )}
                      </div>
                    ),
                  )}

                <SeparatorLine />
              </FormWrapper>
            );
          },
        )}
      </FormWrapper>

      {/* STRUCTURE SUBSECTION */}
      <FormWrapper
        subtitle="Company Structure"
        subtitleChildren={
          <ButtonLight
            buttonText="+ Add Level"
            clickAction={addHierarchyLevel}
          />
        }
      >
        {companyStructureData.map((level) => (
          <div
            key={level.id}
            className="container-layout vertical-layout__inner"
          >
            <div className="flex gap-2.5 items-center">
              <div className="font-semibold flex-1">Level {level.id}</div>

              <DeleteIconBtn
                deleteFunc={() => deleteHierarchyLevel(level.id)}
              />
            </div>

            <InputArea
              label="Level Name"
              val={level.levelName}
              changeFunc={(val) => updateStructure(level.id, val)}
            />

            <div className="vertical-layout__inner">
              <div className="flex gap-2.5 items-center">
                <div className="flex-1">Positions</div>

                <ButtonLight
                  buttonText="+ Add Position"
                  clickAction={() => addLevelPosition(level.id)}
                />
              </div>

              {level.positions.map((position, index) => (
                <InputArea
                  key={index}
                  keyVal={index}
                  val={position}
                  label=""
                  changeFunc={(val) =>
                    updateStructure(level.id, level.levelName, index, val)
                  }
                >
                  <DeleteIconBtn
                    deleteFunc={() => deleteLevelPosition(level.id, index)}
                  />
                </InputArea>
              ))}

              <SeparatorLine />
            </div>
          </div>
        ))}
      </FormWrapper>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight buttonText="Reset Changes" clickAction={resetChanges} />
        <Button buttonText="Save All Changes" clickAction={saveAllChanges} />
      </div>
    </div>
  );
}
