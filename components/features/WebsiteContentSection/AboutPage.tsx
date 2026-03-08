"use client";

// component styling
import { DraftifyReact } from "draftify-react";
import "draftify-react/styles.css";
import Button, { ButtonLight, DeleteIconBtn } from "@components/ui/Button";
import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@components/layout/FormWrapper";

// hooks
import useAboutOverview from "@hooks/Website content/aboutPage hooks/useAboutOverview";
import useCompanyStructure from "@hooks/Website content/aboutPage hooks/useCompanyStructure";
import Loader from "@components/ui/Loader";

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
    isObjectOrDraftifyArr,
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
        {aboutOverviewData ? (
          aboutOverviewData.map(({ title, description }, index) => {
            if (isObjectOrDraftifyArr(description)) {
              if (typeof description !== "string") {
                return (
                  <FormWrapper
                    key={index}
                    keyVal={index}
                    subtitleChildren={<></>} // dummy child to remove the separatorLine
                    subtitle={title}
                  >
                    <DraftifyReact
                      draftifyDoc={aboutOverviewSummaryDoc}
                      setDoc={setAboutOverviewSummaryDoc}
                      options={["paragraph"]}
                    />
                  </FormWrapper>
                );
              } else
                return (
                  <InputArea
                    key={index}
                    keyVal={index}
                    label={title}
                    val={description}
                    changeFunc={(val) => updateAboutOverviewData(val, title)}
                  />
                );
            }

            return (
              <FormWrapper
                key={index}
                keyVal={index}
                subtitle={title}
                subtitleChildren={
                  <ButtonLight
                    buttonText="+ Add Item"
                    clickAction={() => handleAddItems(title)}
                  />
                }
              >
                {description.map((reason, index) => (
                  <div key={index} className="flex gap-2.5 p-2.5 items-center">
                    {!Array.isArray(reason) ? (
                      <InputArea
                        label=""
                        val={reason}
                        changeFunc={(val) =>
                          updateAboutOverviewData(val, title, index)
                        }
                      >
                        <DeleteIconBtn
                          deleteFunc={() => handleDeleteItems(title, index)}
                        />
                      </InputArea>
                    ) : (
                      <InputArea
                        label=""
                        val={reason[0]}
                        changeFunc={(val) =>
                          updateAboutOverviewData(val, title, index, 0)
                        }
                      >
                        <InputArea
                          label=""
                          val={reason[1]}
                          changeFunc={(val) =>
                            updateAboutOverviewData(val, title, index, 1)
                          }
                        />

                        <DeleteIconBtn
                          deleteFunc={() => handleDeleteItems(title, index)}
                        />
                      </InputArea>
                    )}
                  </div>
                ))}

                <SeparatorLine />
              </FormWrapper>
            );
          })
        ) : (
          <Loading />
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
        {companyStructureData ? (
          companyStructureData.map((level) => (
            <FormWrapper
              key={level.id}
              keyVal={level.id}
              subtitle={`Level ${level.id}`}
              subtitleChildren={
                <DeleteIconBtn
                  deleteFunc={() => deleteHierarchyLevel(level.id)}
                />
              }
            >
              <InputArea
                label="Level Name"
                val={level.levelName}
                changeFunc={(val) => updateStructure(level.id, val)}
              />

              <FormWrapper
                subtitle="Positions"
                subtitleChildren={
                  <ButtonLight
                    buttonText="+ Add Position"
                    clickAction={() => addLevelPosition(level.id)}
                  />
                }
              >
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
              </FormWrapper>

              <SeparatorLine />
            </FormWrapper>
          ))
        ) : (
          <Loading />
        )}
      </FormWrapper>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight buttonText="Reset Changes" clickAction={resetChanges} />
        <Button buttonText="Save All Changes" clickAction={saveAllChanges} />
      </div>
    </div>
  );
}

function Loading() {
  return (
    <span>
      Loading data
      <Loader />
    </span>
  );
}
