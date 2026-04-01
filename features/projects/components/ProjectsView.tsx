"use client";

import Button from "@global components/ui/Button";
import { SectionTitle } from "@global components/ui/Title";

import useProjects from "../hooks/useProjects";
import { PAGE_META } from "../constants/pageMeta";
import { EMPTY_PROJECT } from "../constants/emptyProject";
import NoProjectSelected from "./NoProjectSelected";
import EditProject from "./EditProject";
import AllProjects from "./AllProjects";

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
          clickAction={actions.handleAddNewProject}
        />
      </div>

      <div className="flex gap-5">
        <AllProjects />

        {state.selectedProject !== EMPTY_PROJECT ? (
          <EditProject />
        ) : (
          <NoProjectSelected />
        )}
      </div>
    </div>
  );
}
