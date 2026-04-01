"use client";

import { useContext } from "react";
import { DEFAULT_SERVICE } from "../constants/defaultService";
import { serviceContext } from "../context/serviceContext";

export default function useServiceEdit() {
  const sContext = useContext(serviceContext);

  if (!sContext) throw new Error("sContext must be within a provider");

  const {
    setIsSaving,
    isAddingNewService,
    setIsAddingNewService,
    setNewServiceData,
    selectedService,
    setSelectedService,
    newSerciceData,
    servicesArr,
    setServicesArr,
    setIsDeleting,
  } = sContext;

  const handleAddNewService = () => {
    setIsAddingNewService(true);
  };

  const handleSaveServiceChanges = () => {
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

  return { handleAddNewService, handleSaveServiceChanges, handleDeleteService };
}
