"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button, { ButtonRed, ButtonLight } from "@components/ui/Button";
import Loader from "@components/ui/Loader";
import { SectionTitle } from "@components/ui/Title";

import { companyServices } from "@services/services";
import Toggle from "../ui/Toggle";
import useProjects from "@hooks/useProjects";

const pageMeta = {
  title: "Projects / Portfolio",
  subtitle: "Showcase completed and ongoing projects",
};

export default function ProjectsSection() {
  const {
    projectsObj,
    newProjectData,
    setNewProjectData,
    handleAddNewProject,
    selectedCategory,
    setSelectedCategory,
    selectedProject,
    setSelectedProject,
    handleSelectedProject,
    emptyProject,
    isAddingNewProject,
    featuredState,
    setFeaturedState,
    completedState,
    setCompletedState,
    handleImageUpload,
    handleSaveChanges,
    handleDeleteProject,
    isSaving,
    isDeleting,
  } = useProjects();

  return (
    <div className="page-layout">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />
        </div>
        <Button
          buttonText={"+ Add New Project"}
          clickAction={handleAddNewProject}
        />
      </div>

      <div className="flex gap-5">
        {/* All projects */}
        <div className="flex-1 feature-container-vertical text-style__body">
          <div className="text-style__subheading">All Projects</div>

          {Object.entries(projectsObj).map(([category, projects]) => (
            <div
              key={category}
              className={`border border-(--terciary-grey) px-2 rounded-[10px]`}
            >
              <div
                className="flex items-center px-1 cursor-pointer h-10"
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === category ? "" : category,
                  )
                }
              >
                <div className="flex-1">{category}</div>

                <div
                  className={`duration-300 ${category === selectedCategory ? "rotate-180" : "rotate-0"}`}
                >
                  <FontAwesomeIcon icon={["fas", "angle-down"]} />
                </div>
              </div>

              <div
                className={`duration-300 transition-all ${category === selectedCategory ? "h-125 overflow-y-scroll section-scrollbar mb-2" : "h-0"}`}
              >
                {category === selectedCategory && (
                  <div className="flex flex-col gap-1.5">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className={`feature-container-vertical text-style__small-text cursor-pointer`}
                        onClick={() => handleSelectedProject(p)}
                      >
                        <div className="flex gap-2.5 items-center">
                          <div className="flex-1 text-style__big-text">
                            {p.name}
                          </div>

                          <div className="grid gap-2 text-center">
                            <div
                              className={`${p.status === "Completed" ? "bg-(--secondary-green)/40 text-(--primary-green)" : "bg-(--secondary-blue)/40 text-(--primary-blue)"} rounded-[10px] p-1`}
                            >
                              {p.status}
                            </div>

                            {p.featured && (
                              <div
                                className={`border border-(--secondary-blue) text-(--secondary-blue) rounded-[10px] p-1`}
                              >
                                Featured
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          {p.description.length > 100
                            ? p.description.slice(0, 100) + "..."
                            : p.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Edit project */}
        {selectedProject !== emptyProject ? (
          <div className="flex-1 h-fit feature-container-vertical">
            <div className="text-style__subheading">
              {isAddingNewProject ? "Add New Project" : "Edit Project"}
            </div>

            <div className="text-style__body">
              Project Name
              <input
                type="text"
                className="input-style w-full mt-1"
                value={
                  isAddingNewProject
                    ? newProjectData.name
                    : selectedProject?.name || ""
                }
                onChange={(e) =>
                  isAddingNewProject
                    ? setNewProjectData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    : setSelectedProject((prev) =>
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
                  isAddingNewProject
                    ? newProjectData.description
                    : selectedProject?.description || ""
                }
                onChange={(e) =>
                  isAddingNewProject
                    ? setNewProjectData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    : setSelectedProject((prev) =>
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
                    isAddingNewProject
                      ? newProjectData.category
                      : selectedProject?.category || ""
                  }
                  onChange={(e) => {
                    if (isAddingNewProject) {
                      setNewProjectData((prev) => ({
                        ...prev,
                        category: e.target
                          .value as (typeof companyServices)[number],
                      }));
                    } else if (selectedProject) {
                      setSelectedProject((prev) => ({
                        ...prev,
                        category: e.target
                          .value as (typeof companyServices)[number],
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
              {isAddingNewProject
                ? newProjectData.images.map((image, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full input-style text-style__body mt-1"
                      value={image}
                      onChange={(e) =>
                        setNewProjectData((prev) => {
                          const updatedImages = [...prev.images];
                          updatedImages[index] = e.target.value;
                          return { ...prev, images: updatedImages };
                        })
                      }
                    />
                  ))
                : selectedProject?.images.map((image, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full input-style text-style__body mt-1"
                      value={image}
                      onChange={(e) =>
                        setSelectedProject((prev) => {
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
                  if (isAddingNewProject) {
                    setNewProjectData((prev) => {
                      const updatedImages = [...prev.images, ""];
                      return { ...prev, images: updatedImages };
                    });
                  } else if (selectedProject) {
                    const updatedImages = [...selectedProject.images, ""];
                    setSelectedProject({
                      ...selectedProject,
                      images: updatedImages,
                    });
                  }
                }}
              >
                <ButtonLight
                  buttonText="Add image"
                  clickAction={handleImageUpload}
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex-1 text-style__body">Set as Featured</div>

              <Toggle state={featuredState} stateSetter={setFeaturedState} />
            </div>

            <div className="flex">
              <div className="flex-1 text-style__body">Set as Completed</div>

              <Toggle state={completedState} stateSetter={setCompletedState} />
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2.5 items-center">
                <Button
                  buttonText="Save Changes"
                  clickAction={handleSaveChanges}
                />
                {isSaving && <Loader />}
              </div>

              <div className="flex gap-2.5 items-center">
                <ButtonRed
                  buttonText="Delete Project"
                  clickAction={handleDeleteProject}
                />
                {isDeleting && <Loader />}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 h-fit feature-container-vertical text-style__body">
            <div className="text-style__subheading">
              {isAddingNewProject ? "Add New Project" : "Edit Project"}
            </div>
            Select a project to start editing
          </div>
        )}
      </div>
    </div>
  );
}
