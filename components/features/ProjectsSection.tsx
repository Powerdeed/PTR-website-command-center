"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Project } from "@/lib/types";
import { formattedProjectData } from "@/services/projects";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
import ButtonLight from "@/components/ui/Button-light";

import { companyServices } from "@/utils/constants/UI-data-constants";

const pageMeta = {
  title: "Projects / Portfolio",
  subtitle: "Showcase completed and ongoing projects",
};

const emptyProject: Project = {
  id: crypto.randomUUID(),
  category: "",
  name: "",
  description: "",
  images: [""],
  status: "Completed",
  featured: false,
};

export default function ProjectsSection() {
  const [projectsObj, setProjectsObj] = useState<Record<string, Project[]>>(
    formattedProjectData(),
  );
  const [isAddingNewProject, setisAddingNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProject, setSelectedProject] = useState(
    projectsObj["Electrical Installation"][0] || null,
  );
  const [newProjectData, setNewProjectData] = useState<Project>(emptyProject);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Electrical Installation",
  );

  const handleAddNewProject = () => setisAddingNewProject(true);

  const handleSaveChanges = () => {
    setIsSaving(true);

    if (isAddingNewProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[newProjectData.category] || [];

        const updatedProjects: Project[] = [
          ...currentProjectsFromCategory,
          newProjectData,
        ];

        return {
          ...prev,
          [newProjectData.category]: updatedProjects,
        };
      });

      setNewProjectData(emptyProject);

      setisAddingNewProject(false);
    } else if (selectedProject) {
      setProjectsObj((prev) => {
        const currentProjectsFromCategory = prev[selectedProject.category];

        const updatedProjects = currentProjectsFromCategory.map((s) =>
          s.id === selectedProject.id ? selectedProject : s,
        );

        return { ...prev, [selectedProject.category]: updatedProjects };
      });
    }

    setIsSaving(false);
  };

  return (
    <div className="page-layout">
      <div className="flex items-center">
        <div className="flex-1">
          <PageTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />
        </div>
        <div onClick={handleAddNewProject}>
          <Button buttonText={"+ Add New Project"} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        {/* All projects */}
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-1 bg-white border border-(--terciary-grey) rounded-[10px] text-style__body">
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
                        className={`flex flex-col gap-2.5 border border-(--terciary-grey) rounded-[10px] p-5 text-style__small-text cursor-pointer`}
                        onClick={() =>
                          setSelectedProject(
                            projects.find((project) => project.id === p.id) ||
                              emptyProject,
                          )
                        }
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

                        <div className="text-(--secondary-grey)">
                          {p.category}
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
        <div className="flex-1 h-fit p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]">
          <div className="text-style__subheading">
            {isAddingNewProject ? "Add New Project" : "Edit Project"}
          </div>

          <div>
            <div>Project Name</div>
            <input
              type="text"
              className="w-full p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
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

          <div>
            <div>Description</div>

            <textarea
              className="w-full h-50 p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
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

          <div>
            <div>Select category</div>

            <div className="w-full h-10 border border-(--terciary-grey) rounded-[10px] px-1 text-style__body flex items-center focus-within:ring-2 focus-within:ring-(--primary-blue)">
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

          <div className="flex flex-col gap-2.5">
            <div>Images</div>

            {isAddingNewProject
              ? newProjectData.images.map((image, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-full p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
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
                    className="w-full p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
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
                setNewProjectData((prev) => {
                  const updatedImages = [...prev.images, ""];
                  return { ...prev, images: updatedImages };
                });
              }}
            >
              <ButtonLight buttonText="Add image" />
            </div>
          </div>

          <div
            className="flex gap-2.5 items-center"
            onClick={handleSaveChanges}
          >
            <Button buttonText="Save Changes" />
            {isSaving && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}
