"use client";

import useProjects from "../hooks/useProjects";

export default function NoProjectSelected() {
  const { state } = useProjects();

  return (
    <div className="flex-1 h-fit feature-container-vertical text-style__body">
      <div className="text-style__subheading">
        {state.isAddingNewProject ? "Add New Project" : "Edit Project"}
      </div>
      Select a project to start editing
    </div>
  );
}
