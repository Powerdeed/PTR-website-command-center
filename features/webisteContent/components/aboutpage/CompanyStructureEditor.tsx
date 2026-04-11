"use client";

import useAboutPage from "@features/webisteContent/hooks/aboutPage/useAboutPage";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { ButtonLight, DeleteIconBtn } from "@global components/ui/Button";

export default function CompanyStructureEditor() {
  const { state, actions } = useAboutPage();

  if (!state.companyStructure) return;

  return state.companyStructure.map((level) => (
    <FormWrapper
      key={level.id}
      keyVal={level.id}
      subtitle={`Level ${level.id}`}
      subtitleChildren={
        <DeleteIconBtn
          deleteFunc={() => actions.deleteHierarchyLevel(level.id)}
        />
      }
    >
      <InputArea
        label="Level Name"
        val={level.levelName}
        changeFunc={(val) => actions.updateStructure(level.id, val)}
      />

      <FormWrapper
        subtitle="Positions"
        subtitleChildren={
          <ButtonLight
            buttonText="+ Add Position"
            clickAction={() => actions.addLevelPosition(level.id)}
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
              actions.updateStructure(level.id, level.levelName, index, val)
            }
          >
            <DeleteIconBtn
              deleteFunc={() => actions.deleteLevelPosition(level.id, index)}
            />
          </InputArea>
        ))}
      </FormWrapper>

      <SeparatorLine />
    </FormWrapper>
  ));
}
