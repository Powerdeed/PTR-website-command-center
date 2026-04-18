import { apiRequest } from "@lib/api/apiRequest";

import { AboutUs } from "../types/aboutPage.types";

export const getAboutUsData = () =>
  apiRequest<{ _id: string; sections: AboutUs[] }>({
    method: "GET",
    url: "/about-us",
  });

export const updateAboutUsData = (data: AboutUs[]) =>
  apiRequest<{ sections: AboutUs[] }>({
    method: "PUT",
    url: "/about-us",
    data: { sections: data },
  });
