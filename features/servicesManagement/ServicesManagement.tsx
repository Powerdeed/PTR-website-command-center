"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button, { ButtonRed } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { SectionTitle } from "@global components/ui/Title";

import { PAGE_META } from "./constants/pageMeta";
import { DEFAULT_SERVICE } from "./constants/defaultService";

import useService from "./hooks/useService";

export default function ServicesManagement() {
  const {
    servicesArr,
    setServicesArr,
    selectedService,
    setSelectedService,
    isAddingNewService,
    isSaving,
    isDeleting,
    newSerciceData,
    setNewServiceData,
    handleAddNewService,
    handleSaveChanges,
    handleDeleteService,
  } = useService();

  return (
    <div className="page-layout">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />
        </div>
        <Button
          buttonText={"+ Add New Service"}
          clickAction={handleAddNewService}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        {/* All services */}
        <div className="flex-1 feature-container-vertical text-style__body">
          <div className="text-style__subheading">All Services</div>

          <table>
            <thead className="font-semibold text-left">
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {servicesArr.map((service) => (
                <tr
                  key={service.name}
                  className="border-t border-(--terciary-grey) hover:bg-(--terciary-grey)/30"
                >
                  <td className="py-2.5">{service.name}</td>
                  <td className="py-2.5">
                    <div
                      className={`w-fit h-fit py-1 px-2 text-center ${service.status ? "text-(--primary-green) bg-(--secondary-green)/30" : "text-(--primary-red) bg-(--secondary-red)/30"}  text-style__small-text rounded-[10px]`}
                    >
                      {service.status ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="py-2.5 flex items-center gap-5 text-(--primary-blue)">
                    <div
                      className="cursor-pointer"
                      onClick={() => setSelectedService(service)}
                    >
                      <FontAwesomeIcon icon={["far", "pen-to-square"]} />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setServicesArr((prev) =>
                          prev.map((s) =>
                            s.name === service.name
                              ? { ...s, status: !s.status }
                              : s,
                          ),
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={["far", service.status ? "eye" : "eye-slash"]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit service */}
        {selectedService !== DEFAULT_SERVICE ? (
          <div className="flex-1 feature-container-vertical">
            <div className="text-style__subheading">
              {isAddingNewService ? "Add New Service" : "Edit Service"}{" "}
            </div>

            <div>
              <div>Service Name</div>
              <input
                type="text"
                className="w-full p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
                value={
                  isAddingNewService
                    ? newSerciceData.name
                    : selectedService?.name || ""
                }
                onChange={(e) =>
                  isAddingNewService
                    ? setNewServiceData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    : setSelectedService((prev) =>
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
                  isAddingNewService
                    ? newSerciceData.description
                    : selectedService?.description || ""
                }
                onChange={(e) =>
                  isAddingNewService
                    ? setNewServiceData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    : setSelectedService((prev) =>
                        prev ? { ...prev, description: e.target.value } : prev,
                      )
                }
              />
            </div>

            <div>
              <div>Image</div>
              <input
                type="text"
                className="w-full p-2.5 border border-(--terciary-grey) rounded-[10px] text-style__body mt-1"
                value={
                  isAddingNewService
                    ? newSerciceData.imageUrl
                    : selectedService?.imageUrl || ""
                }
                onChange={(e) =>
                  isAddingNewService
                    ? setNewServiceData((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    : setSelectedService((prev) =>
                        prev ? { ...prev, imageUrl: e.target.value } : prev,
                      )
                }
              />
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
                  buttonText="Delete Service"
                  clickAction={handleDeleteService}
                />
                {isDeleting && <Loader />}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]">
            <div className="text-style__subheading">
              {isAddingNewService ? "Add New Service" : "Edit Service"}
            </div>
            Select a service to start editing
          </div>
        )}
      </div>
    </div>
  );
}
