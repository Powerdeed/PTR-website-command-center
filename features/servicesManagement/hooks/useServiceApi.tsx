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
    setServicesArr,
    selectedService,
    setSelectedService,
    selectedServiceId,
    setSelectedServiceId,
    setSelectedServiceStatus,
    setIsNewService,
    setIsDeleting,
    setIsUploading,
    setError,
    setFetchServicesError,
  } = context;

  const resetStates = (reason?: "new") => {
    setSelectedServiceId("");
    setSelectedService(reason === "new" ? DEFAULT_SERVICE : null);
    setSelectedServiceStatus(false);
  };

  useEffect(() => {
    const getServicesArr = async () => {
      try {
        const services: Service[] = await getServices();

        setServicesArr(services);
      } catch (error) {
        if (error instanceof ApiError) setFetchServicesError(error.message);
      }
    };

    getServicesArr();
  }, [setError, setServicesArr, setFetchServicesError]);

  const handleAddNewService = () => {
    setIsNewService(true);
    setSelectedService(DEFAULT_SERVICE);
  };

  const handleUploadNewService = async () => {
    if (!selectedService) return;

    await execute(() => createService(selectedService), {
      setLoading: setIsUploading,
      setError,
      onSuccess: (newService) => {
        setServicesArr((prev) => (prev ? [...prev, newService] : prev));
        resetStates("new");
      },
    });
  };

  const handleUploadServiceChanges = async () => {
    if (!selectedService || !selectedServiceId) return;

    await execute(
      () =>
        updateService(selectedServiceId, {
          _id: selectedServiceId,
          ...selectedService,
        }),
      {
        setLoading: setIsUploading,
        setError,
        onSuccess: (updatedService) =>
          setServicesArr((prev) =>
            prev
              ? prev.map((service) =>
                  service._id === selectedServiceId ? updatedService : service,
                )
              : prev,
          ),
      },
    );
  };

  const handleDeleteService = async () => {
    if (!selectedServiceId) return;

    await execute(() => deleteService(selectedServiceId), {
      setLoading: setIsDeleting,
      setError,
      onSuccess: () => {
        setServicesArr((prev) =>
          prev
            ? prev?.filter((service) => service._id !== selectedServiceId)
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
