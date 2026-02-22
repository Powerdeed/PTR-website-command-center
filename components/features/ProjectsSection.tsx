"use client";

import { useState } from "react";

import { Project } from "@/lib/types";
import { projects } from "@/services/projects";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
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
  const [projectsArr, setProjectsArr] = useState(projects);
  const [isAddingNewProject, setisAddingNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProject, setSelectedProject] = useState(
    projectsArr.find((s) => s.status) || projectsArr[0] || null,
  );
  const [newProjectData, setNewProjectData] = useState<Project>(emptyProject);
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof companyServices)[number]
  >("Electrical Installation");

  const handleAddNewProject = () => {
    setisAddingNewProject(true);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);

    if (isAddingNewProject) {
      setProjectsArr((prev) => [...prev, newProjectData]);

      setNewProjectData(emptyProject);

      setisAddingNewProject(false);
    } else if (selectedProject) {
      setProjectsArr((prev) =>
        prev.map((s) =>
          s.name === selectedProject.name ? selectedProject : s,
        ),
      );
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
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px] text-style__body">
          <div className="text-style__subheading">All Projects</div>

          {projectsArr.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col gap-2.5 border border-(--terciary-grey) rounded-[10px] p-5 text-style__small-text cursor-pointer`}
              onClick={() =>
                setSelectedProject(
                  projectsArr.find((p) => p.id === project.id) || emptyProject,
                )
              }
            >
              <div className="flex gap-2.5 items-center">
                <div className="flex-1 text-style__big-text">
                  {project.name}
                </div>
                <div
                  className={`${project.status === "Completed" ? "bg-(--secondary-green)/40 text-(--primary-green)" : "bg-(--secondary-blue)/40 text-(--primary-blue)"} rounded-[10px] p-1`}
                >
                  {project.status}
                </div>

                {project.featured && (
                  <div
                    className={`border border-(--secondary-blue) text-(--secondary-blue) rounded-[10px] p-1`}
                  >
                    Featured
                  </div>
                )}
              </div>

              <div className="text-(--secondary-grey)">{project.category}</div>

              <div>
                {project.description.length > 100
                  ? project.description.slice(0, 100) + "..."
                  : project.description}
              </div>
            </div>
          ))}
        </div>

        {/* Edit project */}
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]">
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
            <div>
              <div className="" />
              Select category
            </div>
            <select
              className="w-full h-10 border border-(--terciary-grey) rounded-[10px] px-0.5"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                console.log(selectedProject);

                if (isAddingNewProject) {
                  setNewProjectData((prev) => ({
                    ...prev,
                    category: selectedCategory,
                  }));
                } else if (selectedProject) {
                  setSelectedProject((prev) => ({
                    ...prev,
                    category: selectedCategory,
                  }));
                }
              }}
            >
              <option value="Electrical Installation">
                Electrical Installation
              </option>
              <option value="Solar Installation">Solar Installation</option>
              <option value="Generators">Generators</option>
              <option value="Automation">Automation</option>
              <option value="Alarms">Alarms</option>
              <option value="CCTV">CCTV</option>
            </select>
          </div>

          <div>
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
