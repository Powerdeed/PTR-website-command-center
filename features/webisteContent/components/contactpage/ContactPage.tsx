"use client";

import Button, { ButtonLight } from "@global components/ui/Button";
import ContactHeroSection from "./ContactHeroSection";
import ContactLocation from "./ContactLocation";
import ContactInformation from "./ContactInformation";
import WorkingHours from "./WorkingHours";
import SocialMedia from "./SocialMedia";

import useContactPage from "../../hooks/contactpage/useContactPage";

export default function ContactPage() {
  const { actions } = useContactPage();

  return (
    <div className="vertical-layout__outer">
      <ContactHeroSection />

      <ContactLocation />

      <ContactInformation />

      <SocialMedia />

      <WorkingHours />

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight
          buttonText="Reset Changes"
          clickAction={actions.resetChanges}
        />
        <Button
          buttonText="Save All Changes"
          clickAction={actions.saveAllChanges}
        />
      </div>
    </div>
  );
}
