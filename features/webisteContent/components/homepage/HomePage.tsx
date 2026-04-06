"use client";

import Button, { ButtonLight } from "@global components/ui/Button";
import AboutSummaryEditor from "./AboutSummaryEditor";
import HeroEditor from "./HeroEditor";

import useWebsiteContent from "@features/webisteContent/hooks/useWebsiteContent";
import TestimonialsEditor from "./TestimonialsEditor";

export default function HomePage() {
  const { actions } = useWebsiteContent();

  return (
    <div className="text-style__body vertical-layout__outer">
      <HeroEditor />

      <AboutSummaryEditor />

      <TestimonialsEditor />

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
