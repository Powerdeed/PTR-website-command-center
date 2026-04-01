"use client";

import { createContext, Dispatch } from "react";

import { Service } from "../types/services.types";

type serviceState = {
  // asset and meta
  servicesArr: Service[];
  setServicesArr: Dispatch<React.SetStateAction<Service[]>>;

  selectedService: Service;
  setSelectedService: Dispatch<React.SetStateAction<Service>>;

  isAddingNewService: boolean;
  setIsAddingNewService: Dispatch<React.SetStateAction<boolean>>;

  isSaving: boolean;
  setIsSaving: Dispatch<React.SetStateAction<boolean>>;

  isDeleting: boolean;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;

  newSerciceData: Service;
  setNewServiceData: Dispatch<React.SetStateAction<Service>>;
};

export const serviceContext = createContext<serviceState | null>(null);
