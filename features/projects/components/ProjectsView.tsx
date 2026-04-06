"use client";

import Button from "@global components/ui/Button";
import { SectionTitle } from "@global components/ui/Title";
import NoProjectSelected from "./NoProjectSelected";
import EditProject from "./EditProject";
import AllProjects from "./AllProjects";

import useProjects from "../hooks/useProjects";

import { PAGE_META } from "../constants/pageMeta";

export default function ProjectsView() {
  const { state, actions } = useProjects();

  return (
    <div className="page-layout">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />
        </div>
        <Button
          buttonText={"+ Add New Project"}
          clickAction={() => actions.resetStates("new")}
        />
      </div>

      <div className="flex gap-5">
        <AllProjects />

        {state.selectedProject && <EditProject />}

        {!state.selectedProject && <NoProjectSelected />}
      </div>
    </div>
  );
}
