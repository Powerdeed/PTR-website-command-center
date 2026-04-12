"use client";

import { useContext, useEffect } from "react";

import { serviceContext } from "../context/serviceContext";

import { ApiError } from "@lib/api/utils/apiError";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/services";

import { Service } from "../types/services.types";

import { DEFAULT_SERVICE } from "../constants/defaultService";
import { execute } from "@lib/api/execute";

export default function useServiceApi() {
  const context = useContext(serviceContext);

  if (!context) throw new Error("context must be within a provider");

  const {
    setServices,
    selectedService,
    setSelectedService,
    setSelectedServiceStatus,
    setIsNewService,
    setIsDeleting,
    setIsUploading,
    setError,
    setFetchServicesError,
  } = context;

  const resetStates = (reason?: "new") => {
    setSelectedService(reason === "new" ? DEFAULT_SERVICE : null);
    setSelectedServiceStatus(false);
  };

  useEffect(() => {
    const getServicesArr = async () => {
      try {
        const services: Service[] = await getServices();

        setServices(services);
      } catch (error) {
        if (error instanceof ApiError) setFetchServicesError(error.message);
      }
    };

    getServicesArr();
  }, [setError, setServices, setFetchServicesError]);

  const handleAddNewService = () => {
    setIsNewService(true);
    setSelectedService(DEFAULT_SERVICE);
  };

  const handleUploadNewService = async () => {
    if (!selectedService) return;

    await execute(
      () => createService({ ...selectedService, _id: crypto.randomUUID() }),
      {
        setLoading: setIsUploading,
        setError,
        onSuccess: (newService) => {
          setServices((prev) => (prev ? [...prev, newService] : prev));
          resetStates("new");
        },
      },
    );
  };

  const handleUploadServiceChanges = async () => {
    if (!selectedService) return;

    await execute(
      () =>
        updateService(selectedService._id, {
          ...selectedService,
        }),
      {
        setLoading: setIsUploading,
        setError,
        onSuccess: (updatedService) =>
          setServices((prev) =>
            prev
              ? prev.map((service) =>
                  service._id === selectedService._id
                    ? updatedService
                    : service,
                )
              : prev,
          ),
      },
    );
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;

    await execute(() => deleteService(selectedService._id), {
      setLoading: setIsDeleting,
      setError,
      onSuccess: () => {
        setServices((prev) =>
          prev
            ? prev?.filter((service) => service._id !== selectedService._id)
            : prev,
        );
        resetStates();
      },
    });
  };

  return {
    handleAddNewService,
    handleUploadNewService,
    handleUploadServiceChanges,
    handleDeleteService,
  };
}
