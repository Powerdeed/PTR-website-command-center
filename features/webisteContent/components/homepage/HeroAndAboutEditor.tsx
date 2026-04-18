"use client";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

import useHomepage from "../../hooks/homepage/useHome";

export default function HeroAndAboutEditor() {
  const { state, actions } = useHomepage();

  if (!state.homepage) return;

  return (
    <div
      className={`vertical-layout__outer ${state.hasHomePageChanged ? "border-2 border-(--secondary-blue)" : ""} rounded-[10px] p-2.5`}
    >
      <div className="text-(--secondary-blue) text-style__small-text">
        {state.hasHomePageChanged &&
          "changes have been made, save before exiting"}
      </div>

      <FormWrapper subtitle="Hero Section">
        <InputArea
          label="Hero Image"
          val={state.homepage.hero.image}
          changeFunc={(val) => actions.updateHomePageData("image", "hero", val)}
        >
          {/* <ButtonLight
            buttonText="Upload"
           clickAction={actions.handleImageUpload}
          /> */}
        </InputArea>

        <InputArea
          label="Hero Title"
          val={state.homepage.hero.title}
          changeFunc={(val) => actions.updateHomePageData("title", "hero", val)}
        />

        <InputArea
          label="Hero Subtitle"
          val={state.homepage.hero.subtitle}
          changeFunc={(val) =>
            actions.updateHomePageData("subtitle", "hero", val)
          }
        />

        <SeparatorLine />
      </FormWrapper>

      {state.homepage.aboutIntro.map((about, index) => (
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
            {/* <ButtonLight
              buttonText="Upload"
              clickAction={actions.handleImageUpload}
            /> */}
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
              actions.updateHomePageData(
                "description",
                "aboutIntro",
                val,
                index,
              )
            }
          />

          <SeparatorLine />
        </FormWrapper>
      ))}
    </div>
  );
}
