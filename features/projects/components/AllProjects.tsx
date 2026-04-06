"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useProjects from "../hooks/useProjects";

export default function AllProjects() {
  const { state, actions } = useProjects();

  if (!state.projectsObj) return;

  return (
    <div className="flex-1 feature-container-vertical text-style__body">
      <div className="text-style__subheading">All Projects</div>

      {Object.entries(state.projectsObj).map(([category, projects]) => (
        <div
          key={category}
          className={`border border-(--terciary-grey) px-2 rounded-[10px]`}
        >
          <div
            className="flex items-center px-1 cursor-pointer h-10"
            onClick={() =>
              state.setSelectedCategory((prev) =>
                prev === category ? "" : category,
              )
            }
          >
            <div className="flex-1">{category}</div>

            <div
              className={`duration-300 ${category === state.selectedCategory ? "rotate-180" : "rotate-0"}`}
            >
              <FontAwesomeIcon icon={["fas", "angle-down"]} />
            </div>
          </div>

          <div
            className={`duration-300 transition-all ${category === state.selectedCategory ? "h-125 overflow-y-scroll section-scrollbar mb-2" : "h-0"}`}
          >
            {category === state.selectedCategory && (
              <div className="flex flex-col gap-1.5">
                {projects.map((p) => (
                  <div
                    key={p._id}
                    className={`feature-container-vertical text-style__small-text cursor-pointer`}
                    onClick={() => actions.handleSelectedProject(p)}
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
  );
}
