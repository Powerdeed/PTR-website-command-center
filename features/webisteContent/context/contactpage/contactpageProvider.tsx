"use client";

import { useState } from "react";

import { contactpageContext } from "./contactpageContext";

import { Contacts } from "../../types/contact.types";

export default function ContactpageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contacts, setContacts] = useState<Contacts | null>(null);

  const [contactsPrev, setContactsPrev] = useState<Contacts | null>(null);

  const [loadingContacts, setLoadingContacts] = useState(false);

  const [loadingContactsError, setLoadingContactsError] = useState("");

  const [updatingContacts, setUpdatingContacts] = useState(false);

  const [updatingContactsError, setUpdatingContactsError] = useState("");

  const [refreshContacts, setRefreshContacts] = useState(false);

  const [hasContactsChanged, setHasContactsChanged] = useState(false);

  return (
    <contactpageContext.Provider
      value={{
        contacts,
        setContacts,
        contactsPrev,
        setContactsPrev,
        loadingContacts,
        setLoadingContacts,
        loadingContactsError,
        setLoadingContactsError,
        updatingContacts,
        setUpdatingContacts,
        updatingContactsError,
        setUpdatingContactsError,
        refreshContacts,
        setRefreshContacts,
        hasContactsChanged,
        setHasContactsChanged,
      }}
    >
      {children}
    </contactpageContext.Provider>
  );
}
