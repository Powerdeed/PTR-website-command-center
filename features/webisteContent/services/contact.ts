import { apiRequest } from "@lib/api/apiRequest";
import { Contacts } from "../types/contact.types";


export const getContactsData = () =>
  apiRequest<Contacts>({
    method: "GET",
    url: "/contacts",
  });

export const updateContactData = (
  data: Contacts,
) =>
  apiRequest<Contacts>({
    method: "PUT",
    url: `/contacts`,
    data,
  });
