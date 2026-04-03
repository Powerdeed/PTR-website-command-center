"use client";

import { createContext, Dispatch } from "react";

import { NewService, Service } from "../types/services.types";

type serviceState = {
  servicesArr: Service[] | null;
  setServicesArr: Dispatch<React.SetStateAction<Service[] | null>>;

  selectedService: NewService | null;
  setSelectedService: Dispatch<React.SetStateAction<NewService | null>>;

  selectedServiceId: string | null;
  setSelectedServiceId: Dispatch<React.SetStateAction<string | null>>;

  selectedServiceStatus: boolean;
  setSelectedServiceStatus: Dispatch<React.SetStateAction<boolean>>;

  isUploading: boolean;
  setIsUploading: Dispatch<React.SetStateAction<boolean>>;

  isNewService: boolean;
  setIsNewService: Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: Dispatch<React.SetStateAction<string>>;

  fetchServicesError: string;
  setFetchServicesError: Dispatch<React.SetStateAction<string>>;

  isDeleting: boolean;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;
};

export const serviceContext = createContext<serviceState | null>(null);
