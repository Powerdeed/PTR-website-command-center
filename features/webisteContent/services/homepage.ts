import { apiRequest } from "@lib/api/apiRequest";
import { Homepage } from "../types/homePage.types";

export const getHomePageData = () =>
  apiRequest<Homepage[]>({
    method: "GET",
    url: "/homepage",
  });

export const updateHomePageData = (dataId: string, data: Homepage) =>
  apiRequest<Homepage>({
    method: "PUT",
    url: `/homepage/${dataId}`,
    data,
  });
