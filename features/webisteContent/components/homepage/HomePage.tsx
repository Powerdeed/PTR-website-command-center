"use client";

import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import HeroAndAboutEditor from "./HeroAndAboutEditor";
import TestimonialsEditor from "./TestimonialsEditor";

import useHomePage from "../../hooks/homepage/useHomepage";

export default function HomePage() {
  const { state, actions } = useHomePage();

  return (
    <div className="text-style__body vertical-layout__outer">
      {!state.getHomepageDataError && <HeroAndAboutEditor />}

      {!state.getTestimonialsError && <TestimonialsEditor />}

      {actions.getErrors && (
        <div className="text-(--primary-red)">{actions.getErrors}</div>
      )}

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight
          buttonText="Reset Changes"
          clickAction={() => state.setRefreshFetchData((prev) => !prev)}
          icon={actions.fetchingData && <Loader />}
        />

        <Button
          buttonText="Save All Changes"
          clickAction={actions.saveAllChanges}
        >
          {state.updatingHomepage && <Loader />}
        </Button>
      </div>

      {actions.updateErrors && (
        <div className="text-(--primary-red)">{actions.updateErrors}</div>
      )}
    </div>
  );
}
