import { apiRequest } from "@lib/api/apiRequest";
import { AboutUs, AboutUsFormatted } from "../types/aboutPage.types";

export const getAboutUsData = () =>
  apiRequest<{ _id: string; sections: AboutUs[] }[]>({
    method: "GET",
    url: "/about-us",
  });

export const updateAboutUsData = (dataId: string, data: AboutUsFormatted[]) =>
  apiRequest<AboutUs[]>({
    method: "PUT",
    url: `/about-us/${dataId}`,
    data: { sections: data },
  });
