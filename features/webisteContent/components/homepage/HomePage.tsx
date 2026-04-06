"use client";

import Button, { ButtonLight } from "@global components/ui/Button";
import Testimonials from "./Testimonials";
import AboutSummaryEditor from "./AboutSummaryEditor";
import HeroEditor from "./HeroEditor";

import useHomePage from "../../hooks/homepage/useHomePage";

export default function HomePage() {
  const { actions } = useHomePage();

  return (
    <div className="text-style__body vertical-layout__outer">
      <HeroEditor />

      <AboutSummaryEditor />

      <Testimonials />

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
