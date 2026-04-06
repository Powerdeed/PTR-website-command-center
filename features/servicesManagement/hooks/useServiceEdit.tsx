"use client";

import { useContext, useEffect } from "react";
import { serviceContext } from "../context/serviceContext";
import { Service } from "../types/services.types";

export default function useServiceEdit() {
  const sContext = useContext(serviceContext);

  if (!sContext) throw new Error("sContext must be within a provider");

  const { selectedService, setSelectedService, selectedServiceStatus } =
    sContext;

  const selectValue = (field: Exclude<keyof Service, "status" | "id">) => {
    if (!selectedService) return;
    return selectedService[field];
  };

  const modifyService = (
    field: Exclude<keyof Service, "status" | "id">,
    value: string,
  ) =>
    setSelectedService((prev) => (prev ? { ...prev, [field]: value } : prev));

  useEffect(() => {
    setSelectedService((prev) =>
      prev ? { ...prev, status: selectedServiceStatus } : prev,
    );
  }, [selectedServiceStatus, setSelectedService]);

  return {
    selectValue,
    modifyService,
  };
}
