"use client";

import { createContext, Dispatch } from "react";

import { Service } from "../types/services.types";

type ServiceState = {
  servicesArr: Service[] | null;
  setServicesArr: Dispatch<React.SetStateAction<Service[] | null>>;

  selectedService: Service | null;
  setSelectedService: Dispatch<React.SetStateAction<Service | null>>;

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

export const serviceContext = createContext<ServiceState | null>(null);
