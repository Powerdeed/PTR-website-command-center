"use client";

import Button, { ButtonLight, ButtonRed } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import Toggle from "@global components/ui/Toggle";

import useProjects from "../hooks/useProjects";

import { companyServices } from "@global utils/constants/COMPANY_PROVISIONS";

export default function EditProject() {
  const { state, actions } = useProjects();

  return (
    <div className="flex-1 feature-container-vertical text-style__body">
      <div className="text-style__subheading">
        {state.isAddingNewProject ? "Add New Project" : "Edit Project"}
      </div>

      <div className="text-style__body">
        Project Name
        <input
          type="text"
          className="input-style w-full mt-1"
          value={
            state.isAddingNewProject
              ? state.newProjectData.name
              : state.selectedProject?.name || ""
          }
          onChange={(e) =>
            state.isAddingNewProject
              ? state.setNewProjectData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              : state.setSelectedProject((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev,
                )
          }
        />
      </div>

      <div className="text-style__body">
        Description
        <textarea
          className="w-full h-50 input-style mt-1"
          value={
            state.isAddingNewProject
              ? state.newProjectData.description
              : state.selectedProject?.description || ""
          }
          onChange={(e) =>
            state.isAddingNewProject
              ? state.setNewProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              : state.setSelectedProject((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev,
                )
          }
        />
      </div>

      <div className="text-style__body">
        Select category
        <div className="w-full h-10 border border-(--terciary-grey) rounded-[10px] px-1 flex items-center focus-within:ring-2 focus-within:ring-(--primary-blue)">
          <select
            className="w-full h-full rounded-[10px] focus:outline-none"
            value={
              state.isAddingNewProject
                ? state.newProjectData.category
                : state.selectedProject?.category || ""
            }
            onChange={(e) => {
              if (state.isAddingNewProject) {
                state.setNewProjectData((prev) => ({
                  ...prev,
                  category: e.target.value as (typeof companyServices)[number],
                }));
              } else if (state.selectedProject) {
                state.setSelectedProject((prev) => ({
                  ...prev,
                  category: e.target.value as (typeof companyServices)[number],
                }));
              }
            }}
          >
            <option value="">select category</option>

            {companyServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 text-style__body">
        Images
        {state.isAddingNewProject
          ? state.newProjectData.images.map((image, index) => (
              <input
                key={index}
                type="text"
                className="w-full input-style text-style__body mt-1"
                value={image}
                onChange={(e) =>
                  state.setNewProjectData((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[index] = e.target.value;
                    return { ...prev, images: updatedImages };
                  })
                }
              />
            ))
          : state.selectedProject?.images.map((image, index) => (
              <input
                key={index}
                type="text"
                className="w-full input-style text-style__body mt-1"
                value={image}
                onChange={(e) =>
                  state.setSelectedProject((prev) => {
                    if (!prev) return prev;
                    const updatedImages = [...prev.images];
                    updatedImages[index] = e.target.value;
                    return { ...prev, images: updatedImages };
                  })
                }
              />
            ))}
        <div
          className="w-fit"
          onClick={() => {
            if (state.isAddingNewProject) {
              state.setNewProjectData((prev) => {
                const updatedImages = [...prev.images, ""];
                return { ...prev, images: updatedImages };
              });
            } else if (state.selectedProject) {
              const updatedImages = [...state.selectedProject.images, ""];
              state.setSelectedProject({
                ...state.selectedProject,
                images: updatedImages,
              });
            }
          }}
        >
          <ButtonLight
            buttonText="Add image"
            clickAction={actions.handleImageUpload}
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 text-style__body">Set as Featured</div>

        <Toggle
          state={state.featuredState}
          stateSetter={state.setFeaturedState}
        />
      </div>

      <div className="flex">
        <div className="flex-1 text-style__body">Set as Completed</div>

        <Toggle
          state={state.completedState}
          stateSetter={state.setCompletedState}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2.5 items-center">
          <Button
            buttonText="Save Changes"
            clickAction={actions.handleSaveChanges}
          />
          {state.isSaving && <Loader />}
        </div>

        <div className="flex gap-2.5 items-center">
          <ButtonRed
            buttonText="Delete Project"
            clickAction={actions.handleDeleteProject}
          />
          {state.isDeleting && <Loader />}
        </div>
      </div>
    </div>
  );
}
