"use client";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

import useHomePage from "../../hooks/homepage/useHomePage";

export default function HeroEditor() {
  const { state, actions } = useHomePage();

  if (!state.homepage) return;

  return (
    <FormWrapper subtitle="Hero Section">
      <InputArea
        label="Hero Image"
        val={state.homepage.hero.image}
        changeFunc={(val) => actions.updateHomePageData("image", "hero", val)}
      >
        <ButtonLight
          buttonText="Upload"
          clickAction={actions.handleImageUpload}
        />
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
  );
}
