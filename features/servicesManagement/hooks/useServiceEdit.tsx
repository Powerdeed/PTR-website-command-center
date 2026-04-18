"use client";

import { useContext, useEffect } from "react";
import { serviceContext } from "../context/serviceContext";
import { Service } from "../types/services.types";

export default function useServiceEdit() {
  const sContext = useContext(serviceContext);

  if (!sContext) throw new Error("sContext must be within a provider");

  const { selectedService, setSelectedService, selectedServiceStatus } =
    sContext;

  const selectValue = (field: Exclude<keyof Service, "status" | "_id">) => {
    if (!selectedService) return;
    return selectedService[field];
  };

  const modifyService = (
    field: Exclude<keyof Service, "status" | "_id">,
    value: string,
    idx?: number,
  ) =>
    setSelectedService((prev) => {
      if (!prev) return prev;

      if (field === "images" && idx !== undefined) {
        const images = [...prev.images];

        images[idx] = value;

        return { ...prev, images };
      }

      return { ...prev, [field]: value };
    });

  useEffect(() => {
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, status: selectedServiceStatus };
    });
  }, [selectedServiceStatus, setSelectedService]);

  const addNewServiceImage = () =>
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, images: [...prev.images, ""] };
    });

  const removeImage = (idx: number) =>
    setSelectedService((prev) => {
      if (!prev) return prev;
      const images = prev.images;

      const newArr = images.toSpliced(idx, 1);

      return { ...prev, images: newArr };
    });

  return {
    selectValue,
    modifyService,
    addNewServiceImage,
    removeImage,
  };
}
