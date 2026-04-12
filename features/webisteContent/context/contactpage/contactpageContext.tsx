"use client";

import { Contacts } from "../../types/contact.types";
import { createContext, Dispatch } from "react";

type ContactpageState = {
  contacts: Contacts | null;
  setContacts: Dispatch<React.SetStateAction<Contacts | null>>;

  contactsPrev: Contacts | null;
  setContactsPrev: Dispatch<React.SetStateAction<Contacts | null>>;

  loadingContacts: boolean;
  setLoadingContacts: Dispatch<React.SetStateAction<boolean>>;

  loadingContactsError: string;
  setLoadingContactsError: Dispatch<React.SetStateAction<string>>;

  updatingContacts: boolean;
  setUpdatingContacts: Dispatch<React.SetStateAction<boolean>>;

  updatingContactsError: string;
  setUpdatingContactsError: Dispatch<React.SetStateAction<string>>;

  refreshContacts: boolean;
  setRefreshContacts: Dispatch<React.SetStateAction<boolean>>;

  hasContactsChanged: boolean;
  setHasContactsChanged: Dispatch<React.SetStateAction<boolean>>;
};

export const contactpageContext = createContext<ContactpageState | null>(null);
