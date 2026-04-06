"use client";

import useContactPage from "@features/webisteContent/hooks/contactpage/useContactPage";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

export default function ContactHeroSection() {
  const { state, actions } = useContactPage();
  return (
    <FormWrapper subtitle="Hero Section">
      <InputArea
        label="Hero Image"
        val={state.contactData.Hero.image}
        changeFunc={(val) => actions.updateByPath(["Hero", "image"], val)}
      >
        <ButtonLight
          buttonText="Upload"
          clickAction={actions.handleImageUpload}
        />
      </InputArea>

      <InputArea
        label="Hero Title"
        val={state.contactData.Hero.title}
        changeFunc={(val) => actions.updateByPath(["Hero", "title"], val)}
      />

      <InputArea
        label="Hero Subtitle"
        val={state.contactData.Hero.subtitle}
        changeFunc={(val) => actions.updateByPath(["Hero", "subtitle"], val)}
      />
    </FormWrapper>
  );
}
