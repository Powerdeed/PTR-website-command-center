"use client";

import DraftifyReact from "draftify-react";
import "draftify-react/styles.css";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { ButtonLight, DeleteIconBtn } from "@global components/ui/Button";

import useAboutPage from "@features/webisteContent/hooks/aboutPage/useAboutPage";

export default function OverviewSubsectionEditor() {
  const { state, actions } = useAboutPage();

  return state.aboutOverviewData.map(({ title, description }, index) => {
    if (actions.isObjectOrDraftifyArr(description)) {
      if (typeof description !== "string") {
        return (
          <FormWrapper key={index} keyVal={index} subtitle={title}>
            <DraftifyReact
              draftifyDoc={state.aboutOverviewSummaryDoc}
              setDoc={state.setAboutOverviewSummaryDoc}
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
            changeFunc={(val) => actions.updateAboutOverviewData(val, title)}
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
            clickAction={() => actions.handleAddItems(title)}
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
                  actions.updateAboutOverviewData(val, title, index)
                }
              >
                <DeleteIconBtn
                  deleteFunc={() => actions.handleDeleteItems(title, index)}
                />
              </InputArea>
            ) : (
              <InputArea
                label=""
                val={reason[0]}
                changeFunc={(val) =>
                  actions.updateAboutOverviewData(val, title, index, 0)
                }
              >
                <InputArea
                  label=""
                  val={reason[1]}
                  changeFunc={(val) =>
                    actions.updateAboutOverviewData(val, title, index, 1)
                  }
                />

                <DeleteIconBtn
                  deleteFunc={() => actions.handleDeleteItems(title, index)}
                />
              </InputArea>
            )}
          </div>
        ))}

        <SeparatorLine />
      </FormWrapper>
    );
  });
}
