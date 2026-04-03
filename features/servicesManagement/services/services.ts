import { apiRequest } from "@lib/apiRequest";
import { NewService, Service } from "../types/services.types";

export const getServices = async (): Promise<Service[]> =>
  await apiRequest<Service[]>({
    method: "GET",
    url: "/services",
  });

export const getService = async (serviceId: string) =>
  await apiRequest<Service>({
    method: "GET",
    url: `/services/${serviceId}`,
  });

export const createService = async (data: NewService): Promise<Service> =>
  await apiRequest({
    method: "POST",
    url: `/services`,
    data,
  });

export const updateService = async (
  serviceId: string,
  data: Service,
): Promise<Service> =>
  await apiRequest({
    method: "PUT",
    url: `/services/${serviceId}`,
    data,
  });

export const deleteService = async (serviceId: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/services/${serviceId}`,
  });
