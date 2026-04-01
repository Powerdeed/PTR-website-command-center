"use client";

import { useState } from "react";
import { serviceContext } from "./serviceContext";
import { services } from "../services/services";
import { DEFAULT_SERVICE } from "../constants/defaultService";
import { Service } from "../types/services.types";

export default function ServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [servicesArr, setServicesArr] = useState(services);
  const [selectedService, setSelectedService] = useState(
    servicesArr.find((s) => s.status) || servicesArr[0] || null,
  );
  const [isAddingNewService, setIsAddingNewService] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [newSerciceData, setNewServiceData] =
    useState<Service>(DEFAULT_SERVICE);

  return (
    <serviceContext.Provider
      value={{
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
      }}
    >
      {children}
    </serviceContext.Provider>
  );
}
