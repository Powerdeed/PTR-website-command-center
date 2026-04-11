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
      <FormWrapper
        title="Overview Subsection"
        subtitle=""
        separatorLine={false}
      >
        <div
          className={`border-(--secondary-blue) rounded-[10px] p-2.5 ${state.hasHompageChanged && "border-2"}`}
        >
          {state.hasHompageChanged && (
            <div className="text-(--secondary-blue) text-style__small-text mb-2.5">
              Changes have been made, save before exiting
            </div>
          )}
          {state.aboutUs ? <OverviewSubsectionEditor /> : <Loading />}
        </div>
      </FormWrapper>

      <FormWrapper
        title="Company Structure"
        subtitle=""
        subtitleChildren={
          <ButtonLight
            buttonText="+ Add Level"
            clickAction={actions.addHierarchyLevel}
          />
        }
      >
        <div
          className={`border-(--secondary-blue) rounded-[10px] p-2.5 ${state.hasCompanyStructureChanged && "border-2"}`}>
          {state.hasCompanyStructureChanged && (
            <div className="text-(--secondary-blue) text-style__small-text mb-2.5">
              Changes have been made, save before exiting
            </div>
          )}
        <div
          className="h-200 feature-container-vertical overflow-auto section-scrollbar"
        >

          {state.companyStructure ? <CompanyStructureEditor /> : <Loading />}
        </div></div>
      </FormWrapper>

      <div className="text-(--primary-red)">
        {state.updatingAboutUsError}
        {state.updatingCompanyStructureError}
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight
          buttonText="Reset Changes"
          clickAction={() => {state.setRefreshAboutpage((prev) => !prev);state.setRefreshCompanyStructure((prev) => !prev);}}
          icon={state.loadingAboutUs && <Loader />}
        />
        <Button
          buttonText="Save All Changes"
          clickAction={() => {
            actions.handleSaveAboutPage();
            actions.handlesaveCompanyStructure();
          }}
        >
          {(state.updatingAboutUs || state.updatingCompanyStructure) && (
            <Loader />
          )}
        </Button>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center gap-2.5">
      Loading aboutpage data
      <Loader />
    </div>
  );
}
