"use client";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

import useHomePage from "../../hooks/homepage/useHomepage";

export default function AboutSummaryEditor() {
  const { state, actions } = useHomePage();

  if (!state.homepage) return;

  return state.homepage.aboutIntro.map((about, index) => (
    <FormWrapper
      key={index}
      keyVal={index}
      subtitle={`About Summary - ${index === 0 ? "Top" : "Bottom"} Section`}
    >
      <em className="text-(--secondary-grey) text-style__small-text">
        Image on the {index === 0 ? "left" : "right"}, content on the{" "}
        {index === 0 ? "right" : "left"}
      </em>

      <InputArea
        label="Image"
        val={about.image}
        changeFunc={(val) =>
          actions.updateHomePageData("image", "aboutIntro", val, index)
        }
      >
        <ButtonLight
          buttonText="Upload"
          clickAction={actions.handleImageUpload}
        />
      </InputArea>

      <InputArea
        label="Title"
        val={about.title}
        changeFunc={(val) =>
          actions.updateHomePageData("title", "aboutIntro", val, index)
        }
      />

      <InputArea
        label="Description"
        val={about.description}
        changeFunc={(val) =>
          actions.updateHomePageData("description", "aboutIntro", val, index)
        }
      />

      <SeparatorLine />
    </FormWrapper>
  ));
}
