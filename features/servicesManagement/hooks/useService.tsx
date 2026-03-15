"use client";

import { useState } from "react";
import { services } from "../services/services";
import { DEFAULT_SERVICE } from "../constants/defaultService";
import { Service } from "../types/services.types";

export default function useService() {
  const [servicesArr, setServicesArr] = useState(services);
  const [selectedService, setSelectedService] = useState(
    servicesArr.find((s) => s.status) || servicesArr[0] || null,
  );
  const [isAddingNewService, setIsAddingNewService] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [newSerciceData, setNewServiceData] =
    useState<Service>(DEFAULT_SERVICE);

  const handleAddNewService = () => {
    setIsAddingNewService(true);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);

    if (isAddingNewService) {
      setServicesArr((prev) => [...prev, newSerciceData]);
      setNewServiceData(DEFAULT_SERVICE);
      setIsAddingNewService(false);
    } else if (selectedService) {
      setServicesArr((prev) =>
        prev.map((s) => (s.id === selectedService.id ? selectedService : s)),
      );

      console.log(servicesArr);
    }

    setIsSaving(false);
  };

  const handleDeleteService = () => {
    setIsDeleting(true);

    if (isAddingNewService) {
      setIsAddingNewService(false);
      setNewServiceData(DEFAULT_SERVICE);
    } else if (selectedService) {
      setServicesArr((prev) => prev.filter((s) => s.id !== selectedService.id));
      setSelectedService(DEFAULT_SERVICE);
    }
    setIsDeleting(false);
  };

  return {
    servicesArr,
    setServicesArr,
    selectedService,
    setSelectedService,
    isAddingNewService,
    setIsAddingNewService,
    isSaving,
    setIsSaving,
    isDeleting,
    setIsDeleting,
    newSerciceData,
    setNewServiceData,
    handleAddNewService,
    handleSaveChanges,
    handleDeleteService,
  };
}
