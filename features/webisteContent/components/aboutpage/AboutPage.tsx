"use client";

import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import FormWrapper from "@global components/layout/FormWrapper";

import OverviewSubsectionEditor from "./OverviewSubsectionEditor";
import CompanyStructureEditor from "./CompanyStructureEditor";
import useAboutPage from "@features/webisteContent/hooks/aboutPage/useAboutPage";

export default function AboutPage() {
  const { state, actions } = useAboutPage();

  return (
    <div className="vertical-layout__outer">
      <FormWrapper subtitle="Overview Subsection">
        {state.aboutOverviewData ? <OverviewSubsectionEditor /> : <Loading />}
      </FormWrapper>

      <FormWrapper
        subtitle="Company Structure"
        subtitleChildren={
          <ButtonLight
            buttonText="+ Add Level"
            clickAction={actions.addHierarchyLevel}
          />
        }
      >
        {state.companyStructureData ? <CompanyStructureEditor /> : <Loading />}
      </FormWrapper>

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

function Loading() {
  return (
    <span>
      Loading data
      <Loader />
    </span>
  );
}
