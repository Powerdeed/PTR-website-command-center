"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Service } from "@/lib/types";
import { services } from "@/services/services";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";

const pageMeta = {
  title: "Services Management",
  subtitle: "Control what services appear on the website",
};

export default function ServicesManagementSection() {
  const [servicesArr, setServicesArr] = useState(services);
  const [isAddingNewService, setIsAddingNewService] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedService, setSelectedService] = useState(
    servicesArr.find((s) => s.status) || servicesArr[0] || null,
  );

  const [newSerciceData, setNewServiceData] = useState<Service>({
    name: "",
    description: "",
    imageUrl: "",
    status: false,
  });

  const handleAddNewService = () => {
    setIsAddingNewService(true);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);

    if (isAddingNewService) {
      setServicesArr((prev) => [...prev, newSerciceData]);
      setNewServiceData({
        name: "",
        description: "",
        imageUrl: "",
        status: false,
      });
      setIsAddingNewService(false);
    } else if (selectedService) {
      setServicesArr((prev) =>
        prev.map((s) =>
          s.name === selectedService.name ? selectedService : s,
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
        <div onClick={handleAddNewService}>
          <Button buttonText={"+ Add New Service"} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        {/* All services */}
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px] text-style__body">
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
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]">
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
